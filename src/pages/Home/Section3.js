import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionTitle from "../../components/ui/SectionTitle";
import MenuCard from "../../components/common/MenuCard";
import AdsBanner from "../../components/common/AdsBanner";
import { menuItems } from "../../data/menuData";
import { useCart } from "../../context/CartContext";

function Section3() {
  const { addToCart } = useCart();

  return (
    <section className="menu_section">
      <Container>
        <Row>
          <SectionTitle
            title="OUR CRAZY BURGERS"
            subtitle="Aliquam a augue suscipit, luctus neque purus ipsum neque undo dolor primis libero tempus, blandit a cursus varius magna"
            colProps={{ lg: { span: 8, offset: 2 } }}
            className="mb-5"
          />
        </Row>
        <Row>
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              {...item}
              onAddToCart={() => addToCart(item)}
            />
          ))}
        </Row>

        <Row className="pt-5">
          <Col sm={6} lg={5}>
            <AdsBanner imageClass="ads_img1 mb-5 mb-md-0" />
          </Col>
          <Col sm={6} lg={7}>
            <AdsBanner imageClass="ads_img2" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Section3;
