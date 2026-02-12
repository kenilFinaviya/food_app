import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders home navigation", () => {
  render(<App />);
  const homeLink = screen.getByText(/home/i);
  expect(homeLink).toBeInTheDocument();
});
