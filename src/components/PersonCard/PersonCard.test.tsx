import { render, screen } from "@testing-library/react";
import mockData from "src/__mocks__/persons";
import { Provider } from "react-redux";
import PersonCard from "./PersonCard";
import { store } from "src/store/store";
import mockRouter from "../../__mocks__/mockRouter";

describe("PersonCard", () => {
  const data = mockData[0];

  beforeAll(() => {
    mockRouter({ id: 2, page: 1 }, "/detail/[id]");
  });

  test("should render relevant card data", () => {
    render(
      <Provider store={store}>
        <PersonCard isSelected={false} {...data} />
      </Provider>,
    );
    const link = screen.getByTestId("person-card");
    const header = screen.getByTestId("person-card-header");

    expect(link).toHaveAttribute("href", "/detail/1?page=1");
    expect(header).toHaveTextContent(data.name);
  });
});
