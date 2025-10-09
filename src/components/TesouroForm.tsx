import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TesouroDiretoParams } from "@/lib/financial-calculator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface TesouroFormProps {
  params: TesouroDiretoParams;
  onChange: (params: TesouroDiretoParams) => void;
}

export function TesouroForm({ params, onChange }: TesouroFormProps) {
  const updateParam = <K extends keyof TesouroDiretoParams>(key: K, value: TesouroDiretoParams[K]) => {
    onChange({ ...params, [key]: value });
  };
  
  return (
    <Card className="financial-card space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Tesouro Direto</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="initialInvestment">Aporte Inicial (R$)</Label>
            <Input
              id="initialInvestment"
              type="number"
              value={params.initialInvestment}
              onChange={(e) => updateParam("initialInvestment", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Por padrão, igual ao custo total do imóvel
            </p>
          </div>
          
          <div>
            <Label htmlFor="monthlyContribution">Aportes Mensais (R$)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              value={params.monthlyContribution}
              onChange={(e) => updateParam("monthlyContribution", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="bondType">Tipo de Título</Label>
            <Select
              value={params.bondType}
              onValueChange={(value: "selic" | "ipca" | "prefixado") => updateParam("bondType", value)}
            >
              <SelectTrigger id="bondType" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="selic">Tesouro Selic</SelectItem>
                <SelectItem value="ipca">Tesouro IPCA+</SelectItem>
                <SelectItem value="prefixado">Tesouro Prefixado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="annualRate">
              {params.bondType === "selic" && "Taxa Selic Esperada (% a.a.)"}
              {params.bondType === "ipca" && "Taxa Real IPCA+ (% a.a.)"}
              {params.bondType === "prefixado" && "Taxa Prefixada (% a.a.)"}
            </Label>
            <Input
              id="annualRate"
              type="number"
              step="0.1"
              value={params.annualRate}
              onChange={(e) => updateParam("annualRate", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          {params.bondType === "ipca" && (
            <div>
              <Label htmlFor="ipca">IPCA Esperado (% a.a.)</Label>
              <Input
                id="ipca"
                type="number"
                step="0.1"
                value={params.ipca}
                onChange={(e) => updateParam("ipca", parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          )}
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="custodyFee">Taxa de Custódia B3 (% a.a.)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      Padrão oficial: 0,20% a.a. provisionada diariamente
                      <br />
                      Fonte: Tesouro Direto
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="custodyFee"
              type="number"
              step="0.01"
              value={params.custodyFee}
              onChange={(e) => updateParam("custodyFee", parseFloat(e.target.value) || 0)}
            />
          </div>
          
          <div>
            <Label htmlFor="brokerageFee">Taxa da Corretora (% a.a.)</Label>
            <Input
              id="brokerageFee"
              type="number"
              step="0.01"
              value={params.brokerageFee}
              onChange={(e) => updateParam("brokerageFee", parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Opcional - muitas não cobram</p>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">IR Regressivo Automático</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Até 180 dias: 22,5%</li>
            <li>• 181 a 360 dias: 20,0%</li>
            <li>• 361 a 720 dias: 17,5%</li>
            <li>• Acima de 720 dias: 15,0%</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2">
            Fonte: Tesouro Direto (tabela oficial)
          </p>
        </div>
      </div>
    </Card>
  );
}
