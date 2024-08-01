import { render, screen } from "@testing-library/react";
import DetailsPage from "../pages/detail/[id]";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import mockRouter from "src/__mocks__/mockRouter";
import mockData from "src/__mocks__/persons";

describe("Detail Page", () => {
  beforeAll(() => {
    mockRouter({ id: 2 });
  });

  it("should render detail page", () => {
    render(
      <Provider store={store}>
        <DetailsPage
          details={mockData[0]}
          persons={{ count: 0, results: [] }}
        />
      </Provider>,
    );

    expect(screen.getByTestId("detailed-card")).toBeInTheDocument();
  });
});
