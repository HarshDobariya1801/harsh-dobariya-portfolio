import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "./Icons";

type ActionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
  children: ReactNode;
  className?: string;
  icon?: "arrow" | "external";
  variant?: "primary" | "outline" | "text";
};

export default function ActionLink({
  children,
  className,
  icon,
  variant = "text",
  ...props
}: ActionLinkProps) {
  const classes = [
    "action-link",
    variant === "text" ? "text-link" : "button",
    variant === "primary" ? "button-primary" : "",
    className ?? "",
  ].filter(Boolean).join(" ");

  return (
    <a className={classes} {...props}>
      <span>{children}</span>
      {icon === "arrow" && <ArrowRightIcon className="action-link-icon" />}
      {icon === "external" && <ArrowUpRightIcon className="action-link-icon" />}
    </a>
  );
}
