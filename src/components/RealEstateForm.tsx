import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { RealEstateParams } from "@/lib/financial-calculator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface RealEstateFormProps {
  params: RealEstateParams;
  onChange: (params: RealEstateParams) => void;
}

export function RealEstateForm({ params, onChange }: RealEstateFormProps) {
  const updateParam = <K extends keyof RealEstateParams>(key: K, value: RealEstateParams[K]) => {
    onChange({ ...params, [key]: value });
  };
  
  return (
    <Card className="financial-card space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Imóvel para Aluguel (SP)</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="propertyPrice">Preço do Imóvel (R$)</Label>
            <Input
              id="propertyPrice"
              type="number"
              value={params.propertyPrice}
              onChange={(e) => updateParam("propertyPrice", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="acquisitionCosts">Custos de Aquisição (R$)</Label>
            <Input
              id="acquisitionCosts"
              type="number"
              value={params.acquisitionCosts}
              onChange={(e) => updateParam("acquisitionCosts", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">ITBI, escritura, registro, etc.</p>
          </div>
          
          <div>
            <Label htmlFor="monthlyRent">Aluguel Mensal (R$)</Label>
            <Input
              id="monthlyRent"
              type="number"
              value={params.monthlyRent}
              onChange={(e) => updateParam("monthlyRent", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="vacancyMonthsPerYear">Vacância (meses/ano)</Label>
            <Input
              id="vacancyMonthsPerYear"
              type="number"
              step="0.1"
              value={params.vacancyMonthsPerYear}
              onChange={(e) => updateParam("vacancyMonthsPerYear", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="rentGrowthRate">Crescimento do Aluguel (% a.a.)</Label>
            <Input
              id="rentGrowthRate"
              type="number"
              step="0.1"
              value={params.rentGrowthRate}
              onChange={(e) => updateParam("rentGrowthRate", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="propertyAppreciation">Valorização do Imóvel (% a.a.)</Label>
            <Input
              id="propertyAppreciation"
              type="number"
              step="0.1"
              value={params.propertyAppreciation}
              onChange={(e) => updateParam("propertyAppreciation", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Despesas Mensais</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="condominiumFee">Condomínio (R$/mês)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Despesas ordinárias são tipicamente do inquilino</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="condominiumFee"
              type="number"
              value={params.condominiumFee}
              onChange={(e) => updateParam("condominiumFee", parseFloat(e.target.value) || 0)}
            />
            <div className="flex items-center space-x-2 mt-2">
              <Switch
                id="condominiumPaidByTenant"
                checked={params.condominiumPaidByTenant}
                onCheckedChange={(checked) => updateParam("condominiumPaidByTenant", checked)}
              />
              <Label htmlFor="condominiumPaidByTenant" className="text-sm font-normal">
                Pago pelo inquilino
              </Label>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="iptu">IPTU (R$/mês)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Tipicamente do proprietário, mas pode ser repassado</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="iptu"
              type="number"
              value={params.iptu}
              onChange={(e) => updateParam("iptu", parseFloat(e.target.value) || 0)}
            />
            <div className="flex items-center space-x-2 mt-2">
              <Switch
                id="iptuPaidByTenant"
                checked={params.iptuPaidByTenant}
                onCheckedChange={(checked) => updateParam("iptuPaidByTenant", checked)}
              />
              <Label htmlFor="iptuPaidByTenant" className="text-sm font-normal">
                Pago pelo inquilino
              </Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="insurance">Seguro Incêndio (R$/ano)</Label>
            <Input
              id="insurance"
              type="number"
              value={params.insurance}
              onChange={(e) => updateParam("insurance", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
            <div className="flex items-center space-x-2 mt-2">
              <Switch
                id="insurancePaidByTenant"
                checked={params.insurancePaidByTenant}
                onCheckedChange={(checked) => updateParam("insurancePaidByTenant", checked)}
              />
              <Label htmlFor="insurancePaidByTenant" className="text-sm font-normal">
                Pago pelo inquilino
              </Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="managementFee">Taxa de Administração (% do aluguel)</Label>
            <Input
              id="managementFee"
              type="number"
              step="0.1"
              value={params.managementFee}
              onChange={(e) => updateParam("managementFee", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Padrão mercado: 8-10%</p>
          </div>
          
          <div>
            <Label htmlFor="brokerageFee">Comissão 1º Aluguel (multiplicador)</Label>
            <Input
              id="brokerageFee"
              type="number"
              step="0.1"
              value={params.brokerageFee}
              onChange={(e) => updateParam("brokerageFee", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Ex: 1.0 = um aluguel</p>
          </div>
          
          <div>
            <Label htmlFor="maintenanceFee">Manutenção (% a.a. do valor do imóvel)</Label>
            <Input
              id="maintenanceFee"
              type="number"
              step="0.1"
              value={params.maintenanceFee}
              onChange={(e) => updateParam("maintenanceFee", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="defaultRate">Inadimplência (% do aluguel/ano)</Label>
            <Input
              id="defaultRate"
              type="number"
              step="0.1"
              value={params.defaultRate}
              onChange={(e) => updateParam("defaultRate", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="rentalTaxRate">IR sobre Aluguel (% alíquota efetiva)</Label>
            <Input
              id="rentalTaxRate"
              type="number"
              step="0.1"
              value={params.rentalTaxRate}
              onChange={(e) => updateParam("rentalTaxRate", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Simplificado. Tabela progressiva: 0-27,5%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
