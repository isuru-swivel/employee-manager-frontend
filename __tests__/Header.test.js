import Header from "../src/components/Header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("header", () => {
  it("should render", () => {
    render(<Header />);
    const headerElement = screen.getByText("Employee Manager");
    expect(headerElement).toBeInTheDocument();
  });
});
