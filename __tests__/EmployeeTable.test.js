import EmployeeListView from "../src/components/templates/EmployeeListView";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { employee } from "../testData";

describe("Employee table view", () => {
  it("should render", () => {
    render(
      <EmployeeListView employees={[employee]} setEmployee={(emp) => {}} />
    );

    //test image
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();

    //test first name
    const firstNameElement = screen.getByText(employee.first_name);
    expect(firstNameElement).toBeInTheDocument();

    //test last name
    const lastNameElement = screen.getByText(employee.last_name);
    expect(lastNameElement).toBeInTheDocument();

    // //test email
    // const emailElement = screen.getByText(employee.email);
    // expect(emailElement).toBeInTheDocument();

    //test phone no
    // const phoneElement = screen.getByText(employee.number);
    // expect(phoneElement).toBeInTheDocument();

    //test gender
    // const genderElement = screen.getByText("Male");
    // expect(genderElement).toBeInTheDocument();
  });
});
