import type {ReactNode} from "react";

import { cn } from "@/lib/utils";

import {
  FooterBottom,
} from "../../ui/footer";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Link} from "react-router-dom";


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
  // logo = <LaunchUI />,
  // name = "Launch UI",
  // columns = [
  //   {
  //     title: "Product",
  //     links: [
  //       { text: "Changelog", href: "https://www.launchuicomponents.com/" },
  //       { text: "Documentation", href: "https://www.launchuicomponents.com/" },
  //     ],
  //   },
  //   {
  //     title: "Company",
  //     links: [
  //       { text: "About", href: "https://www.launchuicomponents.com/" },
  //       { text: "Careers", href: "https://www.launchuicomponents.com/" },
  //       { text: "Blog", href: "https://www.launchuicomponents.com/" },
  //     ],
  //   },
  //   {
  //     title: "Contact",
  //     links: [
  //       { text: "Discord", href: "https://www.launchuicomponents.com/" },
  //       { text: "Twitter", href: "https://www.launchuicomponents.com/" },
  //       { text: "Github", href: "https://www.launchuicomponents.com/" },
  //     ],
  //   },
  // ],
  copyright = "© 2025 Story Dump. All rights reserved",
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
                <Link key={index} to={policy.href}>
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
