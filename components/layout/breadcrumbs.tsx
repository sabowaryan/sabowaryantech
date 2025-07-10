"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function toTitle(str: string) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    href: "/" + segments.slice(0, i + 1).join("/"),
    label: toTitle(seg),
  }));
  return (
    <nav className="w-full px-4 py-2 text-sm" aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link href="/" className="text-primary-600 hover:underline" itemProp="item">
            <span itemProp="name">Accueil</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {crumbs.map((crumb, i) => (
          <React.Fragment key={crumb.href}>
            <span className="mx-1 text-slate-400">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {i === crumbs.length - 1 ? (
                <span className="text-slate-700 dark:text-slate-200 font-semibold" itemProp="name">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-primary-600 hover:underline" itemProp="item">
                  <span itemProp="name">{crumb.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={i + 2} />
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 