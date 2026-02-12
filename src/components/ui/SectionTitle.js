import React from "react";
import { Col } from "react-bootstrap";
import Button from "./Button";

function SectionTitle({
  title,
  subtitle,
  centered = true,
  ctaLabel,
  ctaLink = "/",
  ctaVariant = "primary",
  colProps = { lg: { span: 8, offset: 2 } },
  className = "",
}) {
  return (
    <Col {...colProps} className={`${centered ? "text-center" : ""} ${className}`.trim()}>
      {title && <h2>{title}</h2>}
      {subtitle && <p className={centered ? "para mb-0" : ""}>{subtitle}</p>}
      {ctaLabel && (
        <Button to={ctaLink} variant={ctaVariant}>
          {ctaLabel}
        </Button>
      )}
    </Col>
  );
}

export default SectionTitle;
