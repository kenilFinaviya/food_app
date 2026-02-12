import React from "react";
import { Container, Row } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import SectionTitle from "../../components/ui/SectionTitle";
import MenuCard from "../../components/common/MenuCard";
import { menuItems } from "../../data/menuData";
import { useCart } from "../../context/CartContext";
import "../../styles/HomeStyle.css";

function Menu() {
  const { addToCart } = useCart();

  return (
    <Layout>
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
        </Container>
      </section>
    </Layout>
  );
}

export default Menu;
