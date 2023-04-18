import Header from "../src/components/molecules/Header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("header", () => {
  it("should render", () => {
    render(<Header title={"Employee Manager"} />);
    const headerElement = screen.getByText("Employee Manager");
    expect(headerElement).toBeInTheDocument();
  });
});
