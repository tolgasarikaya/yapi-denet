//src/components/common/ErrorMessage.tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  error: string | null;
  title?: string;
  description?: string;
  className?: string;
}

export function ErrorMessage({
  error,
  title = "Bir hata oluştu",
  description = "Lütfen daha sonra tekrar deneyin veya sistem yöneticisine başvurun.",
  className,
}: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className={cn(className)}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {error ? `Hata: ${error}` : description}
      </AlertDescription>
    </Alert>
  );
}
