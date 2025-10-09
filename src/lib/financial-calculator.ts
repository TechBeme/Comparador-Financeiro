// Motor de cálculo financeiro para comparação Imóvel vs Tesouro Direto

export interface RealEstateParams {
  propertyPrice: number;
  acquisitionCosts: number;
  monthlyRent: number;
  vacancyMonthsPerYear: number;
  rentGrowthRate: number; // % a.a.
  propertyAppreciation: number; // % a.a.
  
  // Despesas
  condominiumFee: number;
  condominiumPaidByTenant: boolean;
  iptu: number; // mensal
  iptuPaidByTenant: boolean;
  insurance: number; // anual
  insurancePaidByTenant: boolean;
  managementFee: number; // % do aluguel
  brokerageFee: number; // primeiro aluguel
  maintenanceFee: number; // % a.a. do valor do imóvel
  defaultRate: number; // % do aluguel/ano
  
  // IR
  rentalTaxRate: number; // alíquota efetiva simplificada
}

export interface TesouroDiretoParams {
  initialInvestment: number;
  monthlyContribution: number;
  bondType: 'selic' | 'ipca' | 'prefixado';
  annualRate: number; // taxa bruta a.a.
  ipca: number; // % a.a. (para IPCA+)
  custodyFee: number; // % a.a. (padrão 0.20%)
  brokerageFee: number; // % a.a.
}

export interface CommonParams {
  horizonYears: number;
  discountRate: number; // taxa de desconto % a.a.
}

interface MonthlyFlow {
  month: number;
  revenue: number;
  expenses: number;
  tax: number;
  netFlow: number;
  accumulatedFlow: number;
  assetValue: number;
}

interface CalculationResult {
  monthlyFlows: MonthlyFlow[];
  totalReturn: number;
  totalReturnPercent: number;
  irr: number;
  npv: number;
  finalGrossNetWorth: number; // Patrimônio BRUTO (ativo + caixa operacional)
  finalNetNetWorth: number; // Patrimônio LÍQUIDO (bruto - aportes)
  totalInvestment: number; // Total de aportes
  avgMonthlyIncome: number;
  monthlyEquivalentIncome: number; // RME calculada com PMT
}

// Calcula Renda Mensal Equivalente usando fórmula PMT
function calculateMonthlyEquivalentIncome(
  npv: number,
  horizonYears: number,
  discountRate: number
): number {
  const totalMonths = horizonYears * 12;
  const monthlyRate = annualToMonthly(discountRate);
  
  // PMT = PV * (r * (1 + r)^n) / ((1 + r)^n - 1)
  if (monthlyRate === 0) {
    return npv / totalMonths;
  }
  
  const factor = Math.pow(1 + monthlyRate, totalMonths);
  const rme = npv * (monthlyRate * factor) / (factor - 1);
  
  return rme;
}

// Converte taxa anual para mensal
function annualToMonthly(annualRate: number): number {
  return Math.pow(1 + annualRate / 100, 1 / 12) - 1;
}

// Calcula fluxos mensais do imóvel
export function calculateRealEstate(
  params: RealEstateParams,
  common: CommonParams
): CalculationResult {
  const totalMonths = common.horizonYears * 12;
  const monthlyFlows: MonthlyFlow[] = [];
  
  // Conversões corretas: (1+r_aa)^(1/12)-1
  const rentGrowthMonthly = annualToMonthly(params.rentGrowthRate);
  const appreciationMonthly = annualToMonthly(params.propertyAppreciation);
  const defaultMonthly = annualToMonthly(params.defaultRate);
  const maintenanceMonthly = (params.propertyPrice * params.maintenanceFee / 100) / 12;
  
  let currentRent = params.monthlyRent;
  let currentPropertyValue = params.propertyPrice;
  let accumulatedFlow = 0;
  
  const vacancyMonths = Math.round(params.vacancyMonthsPerYear);
  
  for (let month = 1; month <= totalMonths; month++) {
    const isVacant = (month % 12) <= vacancyMonths;
    
    // Aluguel bruto ajustado pelo IPCA (ou crescimento configurado)
    const aluguelBruto = isVacant ? 0 : currentRent;
    
    // Inadimplência mensal sobre aluguel bruto
    const inadimplencia = aluguelBruto * defaultMonthly;
    const receita = aluguelBruto - inadimplencia;
    
    // Despesas do locador
    let expenses = 0;
    
    // Condomínio
    if (!params.condominiumPaidByTenant || isVacant) {
      expenses += params.condominiumFee;
    }
    
    // IPTU
    if (!params.iptuPaidByTenant || isVacant) {
      expenses += params.iptu;
    }
    
    // Seguro (rateado)
    if (!params.insurancePaidByTenant || isVacant) {
      expenses += params.insurance / 12;
    }
    
    // Taxa de administração (% do aluguel bruto)
    if (!isVacant) {
      expenses += aluguelBruto * params.managementFee / 100;
    }
    
    // Corretagem (primeiro aluguel)
    if (month === 1) {
      expenses += params.brokerageFee * params.monthlyRent;
    }
    
    // Manutenção
    expenses += maintenanceMonthly;
    
    // IR efetivo sobre aluguel bruto (alíquota já embute deduções)
    const tax = aluguelBruto * params.rentalTaxRate / 100;
    
    // CF_t = Caixa Operacional do mês
    const netFlow = receita - expenses - tax;
    accumulatedFlow += netFlow;
    
    // Atualiza valor do imóvel
    currentPropertyValue *= (1 + appreciationMonthly);
    
    // Atualiza aluguel (por crescimento ou IPCA)
    currentRent *= (1 + rentGrowthMonthly);
    
    monthlyFlows.push({
      month,
      revenue: receita,
      expenses,
      tax,
      netFlow,
      accumulatedFlow,
      assetValue: currentPropertyValue,
    });
  }
  
  const lastFlow = monthlyFlows[monthlyFlows.length - 1];
  const totalInvestment = params.propertyPrice + params.acquisitionCosts;
  
  // Patrimônio BRUTO = Valor do ativo + Caixa operacional acumulado
  const finalGrossNetWorth = lastFlow.assetValue + lastFlow.accumulatedFlow;
  
  // Patrimônio LÍQUIDO = Patrimônio BRUTO - Investimento inicial
  const finalNetNetWorth = finalGrossNetWorth - totalInvestment;
  
  const totalReturn = finalNetNetWorth;
  const totalReturnPercent = (totalReturn / totalInvestment) * 100;
  
  // === VPL CORRETO DO IMÓVEL ===
  // CF0 = -(Preço + Custos)
  // CF1..n-1 = Caixa Operacional mensal
  // CFn = Caixa Operacional + Valor Final do Imóvel (venda)
  const discountMonthly = annualToMonthly(common.discountRate);
  let npv = -totalInvestment; // CF0 (saída)
  
  monthlyFlows.forEach((flow, idx) => {
    let cashFlow = flow.netFlow; // Caixa operacional
    
    // No último mês: adicionar valor de venda do imóvel
    if (idx === monthlyFlows.length - 1) {
      cashFlow += flow.assetValue;
    }
    
    // Descontar fluxo a valor presente
    npv += cashFlow / Math.pow(1 + discountMonthly, idx + 1);
  });
  
  // === TIR do Imóvel ===
  const cashFlowsForIRR = monthlyFlows.map((f, idx) => {
    let cf = f.netFlow;
    if (idx === monthlyFlows.length - 1) {
      cf += f.assetValue; // Adicionar venda no último mês
    }
    return cf;
  });
  const irr = calculateIRR(cashFlowsForIRR, -totalInvestment);
  
  const avgMonthlyIncome = monthlyFlows.reduce((sum, f) => sum + f.netFlow, 0) / totalMonths;
  
  // === RME: PMT(i_m; n; -VPL) ===
  const monthlyEquivalentIncome = calculateMonthlyEquivalentIncome(
    npv,
    common.horizonYears,
    common.discountRate
  );
  
  // Validação: VPL > 0 deve resultar em RME > 0
  if ((npv > 0 && monthlyEquivalentIncome < 0) || (npv < 0 && monthlyEquivalentIncome > 0)) {
    console.warn('⚠️ Imóvel: VPL e RME com sinais opostos! VPL:', npv, 'RME:', monthlyEquivalentIncome);
  }
  
  return {
    monthlyFlows,
    totalReturn,
    totalReturnPercent,
    irr: irr * 12 * 100, // anualizado em %
    npv,
    finalGrossNetWorth,
    finalNetNetWorth,
    totalInvestment,
    avgMonthlyIncome,
    monthlyEquivalentIncome,
  };
}

// Tabela de IR regressivo Tesouro Direto
function getRegressiveTaxRate(days: number): number {
  if (days <= 180) return 0.225;
  if (days <= 360) return 0.20;
  if (days <= 720) return 0.175;
  return 0.15;
}

// Calcula fluxos mensais do Tesouro Direto
export function calculateTesouroDireto(
  params: TesouroDiretoParams,
  common: CommonParams
): CalculationResult {
  const totalMonths = common.horizonYears * 12;
  const monthlyFlows: MonthlyFlow[] = [];
  
  // === TESOURO PRINCIPAL (sem cupons) ===
  // CF0 = -Aporte Inicial
  // CF1..n-1 = 0 (não há fluxos intermediários)
  // CFn = Resgate Líquido de IR
  
  let balance = params.initialInvestment;
  
  // Taxa nominal do título (para IPCA+)
  let nominalAnnualRate = params.annualRate;
  if (params.bondType === 'ipca') {
    // Fórmula de Fisher exata: (1 + real) × (1 + inflação) - 1
    nominalAnnualRate = ((1 + params.annualRate / 100) * (1 + params.ipca / 100) - 1) * 100;
  }
  
  const nominalMonthlyRate = annualToMonthly(nominalAnnualRate);
  const custodyMonthly = annualToMonthly(params.custodyFee);
  const brokerageMonthly = annualToMonthly(params.brokerageFee);
  
  // Evolução interna do saldo (não gera fluxo até o resgate)
  for (let month = 1; month <= totalMonths; month++) {
    // Aporte mensal (se houver)
    balance += params.monthlyContribution;
    
    // Rendimento bruto
    const grossReturn = balance * nominalMonthlyRate;
    
    // Custódia e corretagem
    const custodyCost = balance * custodyMonthly;
    const brokerageCost = balance * brokerageMonthly;
    
    balance += grossReturn - custodyCost - brokerageCost;
    
    // Para título principal: fluxo intermediário = 0 (não há saques/cupons)
    const netFlow = 0;
    
    monthlyFlows.push({
      month,
      revenue: grossReturn,
      expenses: custodyCost + brokerageCost,
      tax: 0,
      netFlow,
      accumulatedFlow: 0,
      assetValue: balance,
    });
  }
  
  // === RESGATE FINAL (CFn) ===
  const daysHeld = totalMonths * 30;
  const taxRate = getRegressiveTaxRate(daysHeld);
  const totalInvestment = params.initialInvestment + (params.monthlyContribution * totalMonths);
  const grossProfit = balance - totalInvestment;
  const tax = Math.max(0, grossProfit * taxRate);
  const finalBalance = balance - tax;
  
  // Patrimônio BRUTO = Saldo final líquido de IR
  const finalGrossNetWorth = finalBalance;
  
  // Patrimônio LÍQUIDO = Bruto - Total investido
  const finalNetNetWorth = finalGrossNetWorth - totalInvestment;
  
  const totalReturn = finalNetNetWorth;
  const totalReturnPercent = (totalReturn / totalInvestment) * 100;
  
  // === VPL CORRETO DO TESOURO ===
  // CF0 = -Aporte Inicial
  // CF1..n-1 = -Aportes Mensais
  // CFn = Resgate Líquido
  const discountMonthly = annualToMonthly(common.discountRate);
  let npv = -params.initialInvestment; // CF0
  
  for (let month = 1; month <= totalMonths; month++) {
    let cashFlow;
    
    if (month === totalMonths) {
      // CFn = Resgate Líquido
      cashFlow = finalBalance;
    } else {
      // Aportes mensais (fluxos negativos)
      cashFlow = -params.monthlyContribution;
    }
    
    npv += cashFlow / Math.pow(1 + discountMonthly, month);
  }
  
  // === TIR ===
  const cashFlowsForIRR: number[] = [];
  for (let month = 1; month <= totalMonths; month++) {
    if (month === totalMonths) {
      cashFlowsForIRR.push(finalBalance);
    } else {
      cashFlowsForIRR.push(-params.monthlyContribution);
    }
  }
  const irr = calculateIRR(cashFlowsForIRR, -params.initialInvestment);
  
  const avgMonthlyIncome = finalNetNetWorth / totalMonths;
  
  // === RME: PMT(i_m; n; -VPL) ===
  const monthlyEquivalentIncome = calculateMonthlyEquivalentIncome(
    npv,
    common.horizonYears,
    common.discountRate
  );
  
  // Validação: VPL > 0 deve resultar em RME > 0
  if ((npv > 0 && monthlyEquivalentIncome < 0) || (npv < 0 && monthlyEquivalentIncome > 0)) {
    console.warn('⚠️ Tesouro: VPL e RME com sinais opostos! VPL:', npv, 'RME:', monthlyEquivalentIncome);
  }
  
  // Atualiza último fluxo para exibição
  if (monthlyFlows.length > 0) {
    const lastFlow = monthlyFlows[monthlyFlows.length - 1];
    lastFlow.tax = tax;
    lastFlow.netFlow = finalBalance; // Resgate líquido
    lastFlow.accumulatedFlow = finalBalance;
    lastFlow.assetValue = finalBalance;
  }
  
  return {
    monthlyFlows,
    totalReturn,
    totalReturnPercent,
    irr: irr * 12 * 100,
    npv,
    finalGrossNetWorth,
    finalNetNetWorth,
    totalInvestment,
    avgMonthlyIncome,
    monthlyEquivalentIncome,
  };
}

// Aproximação simplificada da TIR usando Newton-Raphson
function calculateIRR(
  cashFlows: number[],
  initialInvestment: number,
  monthlyContribution: number = 0
): number {
  let rate = 0.01; // chute inicial 1% ao mês
  const maxIterations = 100;
  const tolerance = 0.0001;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = initialInvestment;
    let derivative = 0;
    
    cashFlows.forEach((cf, idx) => {
      const period = idx + 1;
      const discount = Math.pow(1 + rate, period);
      npv += cf / discount;
      derivative -= (period * cf) / Math.pow(1 + rate, period + 1);
    });
    
    if (Math.abs(npv) < tolerance) {
      return rate;
    }
    
    rate = rate - npv / derivative;
  }
  
  return rate;
}

// Formata número para moeda brasileira
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Formata número para percentual
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}
