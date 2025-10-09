import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/financial-calculator";

interface ChartDataPoint {
  month: number;
  realEstate: number;
  tesouro: number;
}

interface ComparisonChartProps {
  data: ChartDataPoint[];
  title: string;
}

export function ComparisonChart({ data, title }: ComparisonChartProps) {
  return (
    <Card className="financial-card">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="month" 
            label={{ value: "Mês", position: "insideBottom", offset: -5 }}
            className="text-xs"
          />
          <YAxis 
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            className="text-xs"
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)"
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="realEstate" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            name="Imóvel"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="tesouro" 
            stroke="hsl(var(--secondary))" 
            strokeWidth={2}
            name="Tesouro Direto"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
