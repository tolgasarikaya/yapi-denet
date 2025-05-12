import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="container max-w-screen-xl mx-auto flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              footerActionLink: "text-primary hover:text-primary/90",
              card: "shadow-lg border-slate-200",
            },
          }}
        />
      </div>
    </div>
  );
}
