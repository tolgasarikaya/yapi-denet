"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Building2, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { ROUTES } from "@/constants/routes";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { signOut } = useClerk();

  return (
    <header className="sticky top-0 z-50 bg-slate-800 backdrop-blur ">
      <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4">
        <Link href={ROUTES.HOME} className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-orange-500" />
          <span className="hidden font-heading text-xl font-bold text-white sm:inline-block">
            YapıDenet
          </span>
        </Link>

        {/* Masaüstü navigasyon */}
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          <Link
            href={ROUTES.HOME}
            className={`transition-colors hover:text-white ${
              pathname === ROUTES.HOME ? "text-white" : "text-gray-400"
            }`}
          >
            Ana Sayfa
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-white text-gray-400"
          >
            Hakkımızda
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-white text-gray-400"
          >
            İletişim
          </Link>
        </nav>

        <div className="hidden items-center space-x-2 md:flex">
          <SignedIn>
            <UserButton
              showName
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                  userButtonBox: "text-white",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-black bg-orange-400 text-white hover:bg-orange-600 hover:text-white"
            >
              <Link href={ROUTES.LOGIN}>Giriş Yap</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="bg-white text-black hover:bg-gray-200"
            >
              <Link href={ROUTES.SIGNUP}>Kayıt Ol</Link>
            </Button>
          </SignedOut>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Menüyü Aç</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobil menü */}
      {mobileMenuOpen && (
        <div className="container max-w-screen-xl mx-auto px-4 pb-3 md:hidden bg-black">
          <nav className="flex flex-col space-y-3">
            <Link
              href={ROUTES.HOME}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                pathname === ROUTES.HOME
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-900 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hakkımızda
            </Link>
            <Link
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-900 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              İletişim
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <SignedIn>
                <div className="flex items-center justify-between rounded-md p-3 bg-gray-900">
                  <div className="flex items-center space-x-3">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-8 h-8",
                          userButtonBox: "text-white",
                        },
                      }}
                    />
                    <span className="text-sm font-medium text-white">
                      Hesabım
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    onClick={() => signOut(() => setMobileMenuOpen(false))}
                  >
                    Çıkış Yap
                  </Button>
                </div>
              </SignedIn>
              <SignedOut>
                <Button
                  variant="outline"
                  asChild
                  className="border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white"
                >
                  <Link
                    href={ROUTES.LOGIN}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Giriş Yap
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <Link
                    href={ROUTES.SIGNUP}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kayıt Ol
                  </Link>
                </Button>
              </SignedOut>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
