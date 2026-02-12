import React from "react";
import { Container, Row } from "react-bootstrap";
import { TestimonialCarousel } from "../../components/common/TestimonialCard";
import { testimonials } from "../../data/testimonialData";

function Section6() {
  return (
    <section className="blog_section">
      <Container>
        <Row>
          <TestimonialCarousel items={testimonials} />
        </Row>
      </Container>
    </section>
  );
}

export default Section6;
