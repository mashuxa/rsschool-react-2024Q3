import { render, screen } from "@testing-library/react";
import Preloader from "src/app/loading";

describe("Preloader component", () => {
  it("should render loading", () => {
    render(<Preloader />);

    expect(screen.getByTestId("preloader")).toBeInTheDocument();
  });
});
