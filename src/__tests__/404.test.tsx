import { render, screen } from "@testing-library/react";
import ErrorPage from "src/pages/404";

describe("Error provider", () => {
  it("should render error page", () => {
    render(<ErrorPage />);

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });
});
