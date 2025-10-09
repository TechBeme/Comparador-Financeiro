import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "positive" | "negative" | "neutral";
  variant?: "default" | "primary" | "success";
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: MetricCardProps) {
  const trendColors = {
    positive: "text-secondary",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };
  
  const variantClasses = {
    default: "",
    primary: "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10",
    success: "border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10",
  };
  
  return (
    <Card className={`financial-card ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="metric-label">{title}</p>
          <p className={`metric-value mt-2 ${trend ? trendColors[trend] : ""}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${variant === "primary" ? "bg-primary/10" : variant === "success" ? "bg-secondary/10" : "bg-muted"}`}>
          <Icon className={`h-6 w-6 ${variant === "primary" ? "text-primary" : variant === "success" ? "text-secondary" : "text-foreground"}`} />
        </div>
      </div>
    </Card>
  );
}
