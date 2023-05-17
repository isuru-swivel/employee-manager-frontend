import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import EmployeeFormContainer from "../src/components/organisms/EmployeeFormContainer";
import { employee } from "../testData";

describe("add employee form", () => {
  it("should render", () => {
    render(
      <EmployeeFormContainer handleComplete={(emp) => {}} employee={employee} />
    );

    expect(
      screen.getByRole("textbox", { name: /First Name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Last Name/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Phone/i })).toBeInTheDocument();
  });
});
