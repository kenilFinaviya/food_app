import React from "react";
import { Col } from "react-bootstrap";
import Button from "../ui/Button";

function AdsBanner({
  title = "GET YOUR FREE",
  subtitle = "CHEESE FRIES",
  imageClass,
  linkLabel = "Learn More",
}) {
  return (
    <div className={`ads_box ${imageClass}`}>
      <h4 className="mb-0">{title}</h4>
      <h5>{subtitle}</h5>
      <Button variant="red" className="px-4 rounded-0">
        {linkLabel}
      </Button>
    </div>
  );
}

export default AdsBanner;
