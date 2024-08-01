import { render, screen } from "@testing-library/react";
import PersonCardList from "./PersonCardList";
import mockData from "src/__mocks__/persons";
import { Provider } from "react-redux";
import { createStore } from "src/store/store";
import { Person } from "src/types";
import mockRouter from "src/__mocks__/mockRouter";
import { DataProvider } from "../../providers/DataProvider/DataProvider";

describe("PersonCardList", () => {
  const renderComponent = (results: Person[], count: number) => {
    const mockStore = createStore({
      persons: {
        selectedPersons: {},
      },
    });

    render(
      <Provider store={mockStore}>
        <DataProvider details={{}} persons={{ count, results }}>
          <PersonCardList />
        </DataProvider>
      </Provider>,
    );
  };

  beforeAll(() => {
    mockRouter({});
  });

  test("should render the specified number of PersonCard components", () => {
    renderComponent(mockData, mockData.length);

    expect(screen.getAllByTestId("person-card")).toHaveLength(mockData.length);
  });

  test('should display "No data" message when no data is present', () => {
    renderComponent([], 0);

    expect(screen.getByTestId("no-data")).toHaveTextContent("No data");
  });
});
