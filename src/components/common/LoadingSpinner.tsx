import { cn } from "@/lib/utils";
import { SIZES, ANIMATION_DELAYS } from "@/constants/styles";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  spinnerClassName?: string;
  textClassName?: string;
  spinnerSize?: "sm" | "default" | "lg" | "xl";
  variant?: "default" | "dots" | "pulse";
}

export function LoadingSpinner({
  message = "Yükleniyor...",
  className,
  spinnerClassName,
  textClassName,
  spinnerSize = "default",
  variant = "default",
}: LoadingSpinnerProps) {
  const sizeClasses = SIZES.SPINNER;

  const sizeKey = spinnerSize.toUpperCase() as keyof typeof sizeClasses;

  const renderSpinner = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full bg-primary",
                  sizeClasses.SM,
                  "animate-bounce",
                  i === 0 && "animation-delay-0",
                  i === 1 && "animation-delay-150",
                  i === 2 && "animation-delay-300",
                  spinnerClassName
                )}
                style={{
                  animationDelay:
                    i === 0
                      ? ANIMATION_DELAYS.NONE
                      : i === 1
                      ? ANIMATION_DELAYS.SHORT
                      : ANIMATION_DELAYS.MEDIUM,
                }}
              ></div>
            ))}
          </div>
        );
      case "pulse":
        return (
          <div
            className={cn(
              "rounded-full bg-primary/20 animate-pulse flex items-center justify-center",
              sizeClasses[sizeKey],
              spinnerClassName
            )}
          >
            <div className="rounded-full bg-primary h-1/2 w-1/2"></div>
          </div>
        );
      default:
        return (
          <div
            className={cn(
              "animate-spin rounded-full border-t-2 border-b-2 border-primary",
              sizeClasses[sizeKey],
              spinnerClassName
            )}
          ></div>
        );
    }
  };

  return (
    <div
      className={cn("flex flex-col items-center justify-center p-4", className)}
    >
      {renderSpinner()}
      {message && (
        <p className={cn("mt-2 text-sm text-muted-foreground", textClassName)}>
          {message}
        </p>
      )}
    </div>
  );
}
