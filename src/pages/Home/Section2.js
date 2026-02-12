import React from "react";
import { Container, Row } from "react-bootstrap";
import SectionTitle from "../../components/ui/SectionTitle";
import AboutCard from "../../components/common/AboutCard";
import { aboutCards } from "../../data/aboutData";

function Section2() {
  return (
    <>
      <section className="about_section">
        <Container>
          <Row>
            <SectionTitle
              title="The burger tastes better when you eat it with your family"
              subtitle="Porta semper lacus cursus, feugiat primis ultrice a ligula risus auctor an tempus feugiat dolor lacinia cubilia curae integer orci congue and metus integer primis in integer metus"
              ctaLabel="Explore Full Menu"
              ctaVariant="red"
            />
          </Row>
        </Container>
      </section>
      <section className="about_wrapper">
        <Container>
          <Row className="justify-content-md-center">
            {aboutCards.map((card, index) => (
              <AboutCard key={index} {...card} />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Section2;
