import { useState, useMemo } from "react";
import { Building2, TrendingUp, PiggyBank, Target, DollarSign, Percent } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { RealEstateForm } from "@/components/RealEstateForm";
import { TesouroForm } from "@/components/TesouroForm";
import { ComparisonChart } from "@/components/ComparisonChart";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RealEstateParams,
  TesouroDiretoParams,
  CommonParams,
  calculateRealEstate,
  calculateTesouroDireto,
  formatCurrency,
  formatPercent,
} from "@/lib/financial-calculator";

const Index = () => {
  const [realEstateParams, setRealEstateParams] = useState<RealEstateParams>({
    propertyPrice: 300000,
    acquisitionCosts: 14000,
    monthlyRent: 4000,
    vacancyMonthsPerYear: 0,
    rentGrowthRate: 5.0,
    propertyAppreciation: 5.0,
    condominiumFee: 450,
    condominiumPaidByTenant: true,
    iptu: 150,
    iptuPaidByTenant: true,
    insurance: 200,
    insurancePaidByTenant: true,
    managementFee: 10.0,
    brokerageFee: 1.0,
    maintenanceFee: 0.6,
    defaultRate: 3.5,
    rentalTaxRate: 7.5,
  });

  const [tesouroParams, setTesouroParams] = useState<TesouroDiretoParams>({
    initialInvestment: 314000, // propertyPrice + acquisitionCosts
    monthlyContribution: 0,
    bondType: "ipca",
    annualRate: 8.0, // taxa real para IPCA+
    ipca: 5.0,
    custodyFee: 0.20,
    brokerageFee: 0,
  });

  const [commonParams, setCommonParams] = useState<CommonParams>({
    horizonYears: 10,
    ipca: 5.0,
    discountRate: 13.5,
  });

  // Sincronizar investimento inicial do Tesouro com custo do imóvel
  const syncedTesouroParams = useMemo(() => ({
    ...tesouroParams,
    initialInvestment: realEstateParams.propertyPrice + realEstateParams.acquisitionCosts,
  }), [tesouroParams, realEstateParams.propertyPrice, realEstateParams.acquisitionCosts]);

  const realEstateResults = useMemo(
    () => calculateRealEstate(realEstateParams, commonParams),
    [realEstateParams, commonParams]
  );

  const tesouroResults = useMemo(
    () => calculateTesouroDireto(syncedTesouroParams, commonParams),
    [syncedTesouroParams, commonParams]
  );

  const chartData = useMemo(() => {
    return realEstateResults.monthlyFlows.map((flow, idx) => ({
      month: flow.month,
      realEstate: flow.assetValue + flow.accumulatedFlow - realEstateResults.totalInvestment,
      tesouro: (tesouroResults.monthlyFlows[idx]?.assetValue || 0) - tesouroResults.totalInvestment,
    }));
  }, [realEstateResults, tesouroResults]);

  const chartDataGross = useMemo(() => {
    return realEstateResults.monthlyFlows.map((flow, idx) => ({
      month: flow.month,
      realEstate: flow.assetValue + flow.accumulatedFlow,
      tesouro: tesouroResults.monthlyFlows[idx]?.assetValue || 0,
    }));
  }, [realEstateResults, tesouroResults]);

  const winner = realEstateResults.finalGrossNetWorth > tesouroResults.finalGrossNetWorth ? "realEstate" : "tesouro";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Comparador Financeiro</h1>
              <p className="text-sm text-muted-foreground">Imóvel vs Tesouro Direto</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Horizonte</p>
              <p className="text-2xl font-bold">{commonParams.horizonYears} anos</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Common Parameters */}
        <Card className="financial-card mb-8">
          <h2 className="text-xl font-semibold mb-4">Parâmetros Gerais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="horizonYears">Horizonte de Análise (anos)</Label>
              <Input
                id="horizonYears"
                type="number"
                value={commonParams.horizonYears}
                onChange={(e) =>
                  setCommonParams({ ...commonParams, horizonYears: parseInt(e.target.value) || 1 })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="ipca">IPCA Esperado (% a.a.)</Label>
              <Input
                id="ipca"
                type="number"
                step="0.1"
                value={commonParams.ipca}
                onChange={(e) =>
                  setCommonParams({ ...commonParams, ipca: parseFloat(e.target.value) || 0 })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="discountRate">Taxa de Desconto (% a.a.)</Label>
              <Input
                id="discountRate"
                type="number"
                step="0.1"
                value={commonParams.discountRate}
                onChange={(e) =>
                  setCommonParams({ ...commonParams, discountRate: parseFloat(e.target.value) || 0 })
                }
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="financial-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Detalhes - Imóvel
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Investimento Total</span>
                <span className="font-semibold">
                  {formatCurrency(realEstateResults.totalInvestment)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Patrimônio Líquido</span>
                <span className="font-semibold">{formatCurrency(realEstateResults.finalNetNetWorth)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Patrimônio Bruto</span>
                <span className="font-semibold text-primary">{formatCurrency(realEstateResults.finalGrossNetWorth)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Renda Mensal Equivalente</span>
                <span className="font-semibold">{formatCurrency(realEstateResults.monthlyEquivalentIncome)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Renda Operacional Média</span>
                <span className="font-semibold">{formatCurrency(realEstateResults.avgMonthlyIncome)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Valor do Imóvel (final)</span>
                <span className="font-semibold">
                  {formatCurrency(realEstateResults.monthlyFlows[realEstateResults.monthlyFlows.length - 1]?.assetValue || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Caixa Operacional</span>
                <span className="font-semibold">
                  {formatCurrency(realEstateResults.monthlyFlows[realEstateResults.monthlyFlows.length - 1]?.accumulatedFlow || 0)}
                </span>
              </div>
            </div>
          </Card>

          <Card className="financial-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-secondary" />
              Detalhes - Tesouro Direto
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Investimento Total</span>
                <span className="font-semibold">{formatCurrency(tesouroResults.totalInvestment)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Patrimônio Líquido</span>
                <span className="font-semibold">{formatCurrency(tesouroResults.finalNetNetWorth)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Patrimônio Bruto</span>
                <span className="font-semibold text-secondary">{formatCurrency(tesouroResults.finalGrossNetWorth)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Renda Mensal Equivalente</span>
                <span className="font-semibold">{formatCurrency(tesouroResults.monthlyEquivalentIncome)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Tipo de Título</span>
                <span className="font-semibold capitalize">{tesouroParams.bondType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Taxa Real (IPCA+)</span>
                <span className="font-semibold">{formatPercent(tesouroParams.annualRate)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Resultado da Comparação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Patrimônio Final - Imóvel"
              value={formatCurrency(realEstateResults.finalGrossNetWorth)}
              subtitle={`Líquido: ${formatCurrency(realEstateResults.finalNetNetWorth)} | Retorno: ${formatPercent(realEstateResults.totalReturnPercent)}`}
              icon={Building2}
              trend={winner === "realEstate" ? "positive" : "neutral"}
              variant={winner === "realEstate" ? "primary" : "default"}
            />
            <MetricCard
              title="Patrimônio Final - Tesouro"
              value={formatCurrency(tesouroResults.finalGrossNetWorth)}
              subtitle={`Líquido: ${formatCurrency(tesouroResults.finalNetNetWorth)} | Retorno: ${formatPercent(tesouroResults.totalReturnPercent)}`}
              icon={PiggyBank}
              trend={winner === "tesouro" ? "positive" : "neutral"}
              variant={winner === "tesouro" ? "success" : "default"}
            />
            <MetricCard
              title="Diferença"
              value={formatCurrency(Math.abs(realEstateResults.finalGrossNetWorth - tesouroResults.finalGrossNetWorth))}
              subtitle={winner === "realEstate" ? "Imóvel vence" : "Tesouro vence"}
              icon={TrendingUp}
              trend={winner === "realEstate" ? "positive" : "neutral"}
            />
            <MetricCard
              title="TIR - Imóvel"
              value={formatPercent(realEstateResults.irr)}
              subtitle="Taxa Interna de Retorno"
              icon={Percent}
            />
            <MetricCard
              title="TIR - Tesouro"
              value={formatPercent(tesouroResults.irr)}
              subtitle="Taxa Interna de Retorno"
              icon={Percent}
            />
            <MetricCard
              title="VPL - Diferença"
              value={formatCurrency(realEstateResults.npv - tesouroResults.npv)}
              subtitle={`Taxa: ${formatPercent(commonParams.discountRate)}`}
              icon={Target}
            />
          </div>
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComparisonChart
            data={chartData}
            title="Evolução do Patrimônio Líquido"
          />
          <ComparisonChart
            data={chartDataGross}
            title="Evolução do Patrimônio Bruto"
          />
        </div>


        {/* Input Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RealEstateForm params={realEstateParams} onChange={setRealEstateParams} />
          <TesouroForm params={tesouroParams} onChange={setTesouroParams} />
        </div>

        {/* Footer Info */}
        <Card className="financial-card mt-8 bg-muted/30">
          <h3 className="text-lg font-semibold mb-2">Sobre a Metodologia</h3>
          <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm font-medium mb-1">💡 Patrimônio vs. Retorno</p>
            <p className="text-xs text-muted-foreground">
              <strong>Patrimônio Bruto</strong> = quanto você <strong>tem</strong> (ativo + caixa operacional). 
              <strong> Patrimônio Líquido</strong> = quanto você <strong>ganhou</strong> (patrimônio bruto − aportes). 
              Os cartões mostram ambos para comparação justa.
            </p>
          </div>
          <div className="mb-4 p-3 bg-secondary/5 rounded-lg border border-secondary/20">
            <p className="text-sm font-medium mb-1">📉 Queda no Gráfico do Tesouro Direto</p>
            <p className="text-xs text-muted-foreground">
              A queda visível no último ponto do gráfico de <strong>Patrimônio Líquido</strong> do Tesouro Direto é causada pelo <strong>IR de resgate</strong> (alíquota regressiva de 15% a 22,5% sobre o lucro). Este imposto só é aplicado no momento do resgate, ao final do período.
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Este comparador utiliza cálculos financeiros detalhados considerando:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Vacância automática transfere despesas do inquilino ao proprietário</li>
            <li>IR regressivo oficial do Tesouro Direto (15% a 22,5%)</li>
            <li>Taxa de custódia B3 de 0,20% a.a. (padrão oficial)</li>
            <li>Valorização do imóvel e crescimento do aluguel por inflação + spread</li>
            <li>TIR, VPL e demais métricas calculadas com base em fluxos de caixa reais</li>
            <li>Todas as taxas anuais convertidas para mensais por juros compostos</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            Fontes: Tesouro Direto, Lei do Inquilinato, QuintoAndar, práticas de mercado imobiliário SP.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Index;
