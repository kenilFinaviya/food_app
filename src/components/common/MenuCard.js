/**
 * MenuCard - Product card with Add to Cart
 *
 * Add to Cart is protected: if user is not logged in, redirects to Login page
 * with redirect param so they return to the current page after login.
 */

import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import StarRating from "../ui/StarRating";
import { useAuth } from "../../context/AuthContext";

function MenuCard({ image, rating, title, paragraph, price, onAddToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      const redirect = encodeURIComponent(location.pathname || "/menu");
      navigate(`/login?redirect=${redirect}`);
      return;
    }
    if (onAddToCart) {
      e.preventDefault();
      onAddToCart();
    }
  };

  return (
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} alt={title} />
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <StarRating rating={rating} />
            <div className="wishlist">
              <i className="bi bi-heart" />
            </div>
          </div>

          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>

          <div className="d-flex align-items-center justify-content-between">
            <div className="menu_price">
              <h5 className="mb-0">${price}</h5>
            </div>
            <div className="add_to_card">
              <Link
                to="/menu"
                onClick={handleAddToCart}
              >
                <i className="bi bi-bag me-2" />
                Add To Cart
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MenuCard;
