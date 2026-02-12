import React from "react";
import { Link } from "react-router-dom";

const BUTTON_VARIANTS = {
  primary: "order_now",
  red: "order_now btn_red",
};

const EXTERNAL_PREFIXES = ["tel:", "mailto:", "http://", "https://"];

function isExternalHref(href) {
  return EXTERNAL_PREFIXES.some((prefix) => href.startsWith(prefix));
}

function Button({
  to,
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
  type = "button",
  ...rest
}) {
  const btnClass = `${BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary} ${className}`.trim();
  const target = href || to;

  if (target && !onClick) {
    if (href && isExternalHref(href)) {
      return (
        <a href={href} className={`btn ${btnClass}`} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link to={target || "/"} className={`btn ${btnClass}`} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`btn ${btnClass}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
