import Header from "../src/components/molecules/Header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("header", () => {
  it("should render", () => {
    render(<Header />);
    const headerElement = screen.getByText("Employee Manager");
    expect(headerElement).toBeInTheDocument();
  });
});
