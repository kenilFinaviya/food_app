import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../Food_Assets/assets/logo/logo.png";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "../../styles/HeaderStyle.css";
import "../../styles/AuthStyle.css";

const SCROLL_THRESHOLD = 100;
const LIGHT_HEADER_PATHS = ["/login", "/signup"];

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  // Use sticky (light bg, dark text) on auth pages where background is light
  const useLightHeader = LIGHT_HEADER_PATHS.includes(location.pathname);
  const showStickyStyle = isSticky || useLightHeader;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = document.documentElement?.scrollTop ?? 0;
      setIsSticky(scrollValue > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={showStickyStyle ? "sticky" : ""}
      >
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className="logo">
              <img src={Logo} alt="Logo" className="img-fluid" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/menu">
                Our Menu
              </Nav.Link>
              <Nav.Link as={Link} to="/shop">
                Shop
              </Nav.Link>
              <Nav.Link as={Link} to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              {isAuthenticated ? (
                <>
                  <Nav.Link className="d-flex align-items-center">
                    <span className="header_user_info">
                      <i className="bi bi-person-circle fs-5" />
                      <span className="user_name">{user?.name}</span>
                    </span>
                  </Nav.Link>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link header_auth_btn header_logout_btn border-0"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" className="header_auth_btn header_login_btn text-decoration-none">
                  Login
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/cart">
                <div className="cart">
                  <i className="bi bi-bag fs-5"></i>
                  {cartCount > 0 && (
                    <em className="roundpoint">{cartCount}</em>
                  )}
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
