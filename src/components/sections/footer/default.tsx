import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FooterBottom } from "../../ui/footer";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Link } from "react-router-dom";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  // Customize or add columns here as needed
  copyright = "© 2025 GroupFlix. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Service", href: "/terms-of-service" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4 py-4", className)}>
      <div className="max-w-container mx-auto">
        <>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <Link key={index} to={policy.href} className="hover:underline">
                  {policy.text}
                </Link>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </>
      </div>
    </footer>
  );
}
