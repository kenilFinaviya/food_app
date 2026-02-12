import React from "react";
import { Container, Row, Col, Table, Button as BsButton } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "../../styles/HomeStyle.css";

function Cart() {
  const { items, cartTotal, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <section className="menu_section py-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <h2 className="mb-4">Your Cart is Empty</h2>
                <p className="text-muted mb-4">
                  Add some delicious burgers from our menu!
                </p>
                <Link to="/menu" className="btn order_now">
                  View Our Menu
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="menu_section py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="mb-4">Your Cart</h2>
              <Table responsive className="align-middle">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 4,
                            }}
                            className="me-3"
                          />
                          <span className="fw-semibold">{item.title}</span>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <BsButton
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </BsButton>
                          <span className="px-2">{item.quantity}</span>
                          <BsButton
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </BsButton>
                        </div>
                      </td>
                      <td>
                        $
                        {(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <BsButton
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <i className="bi bi-trash" />
                        </BsButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row className="mt-4">
                <Col md={6}></Col>
                <Col md={6}>
                  <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <h5 className="mb-0">Total:</h5>
                    <h4 className="mb-0 text-danger">
                      ${cartTotal.toFixed(2)}
                    </h4>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

export default Cart;
