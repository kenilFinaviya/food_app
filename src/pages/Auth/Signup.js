/**
 * Signup Page
 *
 * Registers new users. Data stored in localStorage (mock).
 * Redirects to homepage (or redirect param) on success.
 * Ready for API integration.
 */

import React, { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import "../../styles/HomeStyle.css";
import "../../styles/AuthStyle.css";

function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      signup({ name, email, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
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
                <h2 className="auth_title">Sign Up</h2>
                <p className="auth_subtitle">
                  Create an account to start ordering
                </p>

                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError("")}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="signupName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="signupEmail">
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

                  <Form.Group className="mb-3" controlId="signupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      autoComplete="new-password"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="signupConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="red"
                    className="w-100 mb-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating account..." : "Sign Up"}
                  </Button>

                  <p className="auth_footer">
                    Already have an account?{" "}
                    <Link to={`/login${redirectTo !== "/" ? `?redirect=${redirectTo}` : ""}`}>
                      Login
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

export default Signup;
