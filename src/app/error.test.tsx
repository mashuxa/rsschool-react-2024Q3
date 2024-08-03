import { render, screen } from "@testing-library/react";
import ErrorPage from "src/app/error";

describe("Error page", () => {
  it("should render error page", () => {
    render(<ErrorPage />);

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });
});
