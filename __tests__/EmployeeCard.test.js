import EmployeeGridItem from "../src/components/EmployeeGridItem";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { employee } from "../testData";

describe("Employee grid", () => {
  it("should render", () => {
    render(<EmployeeGridItem employee={employee} />);

    //test image
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();

    //test name
    const nameElement = screen.getByText(
      `${employee.first_name} ${employee.last_name}`
    );
    expect(nameElement).toBeInTheDocument();

    //test email
    const emailElement = screen.getByText(employee.email);
    expect(emailElement).toBeInTheDocument();

    //test phone no
    const phoneElement = screen.getByText(employee.number);
    expect(phoneElement).toBeInTheDocument();

    //test gender
    const genderElement = screen.getByText("Male");
    expect(genderElement).toBeInTheDocument();
  });
});
