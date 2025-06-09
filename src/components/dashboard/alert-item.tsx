import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

interface AlertItemProps {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "error" | "success";
  timestamp: string;
  onDismiss?: (id: string) => void;
}

export function AlertItem({ id, title, message, severity, timestamp, onDismiss }: AlertItemProps) {
  const Icon = {
    info: Info,
    warning: AlertTriangle,
    error: XCircle,
    success: CheckCircle,
  }[severity];

  const alertVariant = {
    info: "default",
    warning: "default", // Using default style, color comes from icon/text
    error: "destructive",
    success: "default", // Using default style, color comes from icon/text
  }[severity] as "default" | "destructive" | undefined;
  
  const iconColor = {
    info: "text-blue-500",
    warning: "text-yellow-500",
    error: "text-destructive", // Uses destructive color from theme
    success: "text-green-500",
  }[severity];


  return (
    <Alert variant={alertVariant} className="mb-4 shadow">
      <div className="flex items-start">
        <Icon className={cn("h-5 w-5 mt-0.5", iconColor)} />
        <div className="ml-3 flex-grow">
          <AlertTitle className={cn("font-semibold font-headline", severity === "error" ? "" : "text-foreground")}>{title}</AlertTitle>
          <AlertDescription className={cn(severity === "error" ? "" : "text-muted-foreground")}>
            {message}
          </AlertDescription>
          <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
        </div>
        {onDismiss && (
          <button onClick={() => onDismiss(id)} className="ml-auto -mx-1.5 -my-1.5 p-1.5 text-muted-foreground hover:text-foreground">
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </Alert>
  );
}
