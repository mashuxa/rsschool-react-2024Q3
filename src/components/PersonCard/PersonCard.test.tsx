import { render, screen } from "@testing-library/react";
import mockData from "src/__mocks__/persons";
import { Provider } from "react-redux";
import PersonCard from "./PersonCard";
import { store } from "src/store/store";
import { mockUseParams, mockUseSearchParams } from "src/__mocks__/mockFn";

describe("PersonCard", () => {
  const data = mockData[0];

  beforeAll(() => {
    mockUseParams("2");
    mockUseSearchParams("1");
  });

  test("should render relevant card data", () => {
    render(
      <Provider store={store}>
        <PersonCard {...data} />
      </Provider>,
    );
    const link = screen.getByTestId("person-card");
    const header = screen.getByTestId("person-card-header");

    expect(link).toHaveAttribute("href", "/detail/1?page=1&search=");
    expect(header).toHaveTextContent(data.name);
  });
});
