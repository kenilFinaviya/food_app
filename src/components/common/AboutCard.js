import React from "react";
import { Col } from "react-bootstrap";

function AboutCard({ image, title, paragraph, colProps = { md: 6, lg: 4 } }) {
  return (
    <Col {...colProps} className="mb-4 mb-md-0">
      <div className="about_box text-center">
        <div className="about_icon">
          <img src={image} className="img-fluid" alt={title} />
        </div>
        <h4>{title}</h4>
        <p>{paragraph}</p>
      </div>
    </Col>
  );
}

export default AboutCard;
