import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { employee } from "../testData";
import EmployeeFormContainer from "../src/components/organisms/EmployeeFormContainer";

describe("Edit employee form", () => {
  it("should render", () => {
    render(
      <EmployeeFormContainer employee={employee} handleComplete={(emp) => {}} />
    );

    expect(
      screen.getByRole("textbox", { name: /First Name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Last Name/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Phone/i })).toBeInTheDocument();

    expect(screen.getByText(employee.gender)).toBeInTheDocument();
  });
});
