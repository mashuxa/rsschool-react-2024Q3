import { render, screen } from "@testing-library/react";
import PersonCardList from "./PersonCardList";
import mockData from "src/__mocks__/persons";
import { Provider } from "react-redux";
import { createStore } from "src/store/store";
import { Person } from "src/types";
import { mockUseParams, mockUseSearchParams } from "src/__mocks__/mockFn";

describe("PersonCardList", () => {
  const renderComponent = (results: Person[]) => {
    const mockStore = createStore({
      persons: {
        selectedPersons: {},
      },
    });

    render(
      <Provider store={mockStore}>
        <PersonCardList persons={results} />
      </Provider>,
    );
  };

  beforeAll(() => {
    mockUseParams("2");
    mockUseSearchParams("1");
  });

  test("should render the specified number of PersonCard components", () => {
    renderComponent(mockData);

    expect(screen.getAllByTestId("person-card")).toHaveLength(mockData.length);
  });

  test('should display "No data" message when no data is present', () => {
    renderComponent([]);

    expect(screen.getByTestId("no-data")).toHaveTextContent("No data");
  });
});
