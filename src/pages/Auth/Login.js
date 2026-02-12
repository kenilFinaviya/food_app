/**
 * Login Page
 *
 * Handles user login. Redirects to homepage (or redirect param) on success.
 * Designed for easy swap to API-based auth.
 */

import React, { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import "../../styles/HomeStyle.css";
import "../../styles/AuthStyle.css";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="auth_section">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <div className="auth_card">
                <h2 className="auth_title">Login</h2>
                <p className="auth_subtitle">
                  Sign in to add items to your cart and checkout
                </p>

                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError("")}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="red"
                    className="w-100 mb-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Login"}
                  </Button>

                  <p className="auth_footer">
                    Don't have an account?{" "}
                    <Link to={`/signup${redirectTo !== "/" ? `?redirect=${redirectTo}` : ""}`}>
                      Sign up
                    </Link>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

export default Login;
