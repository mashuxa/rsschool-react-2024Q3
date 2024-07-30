import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { act } from "react";
import { Provider } from "react-redux";
import { createStore } from "src/store/store";
import mockData from "src/__mocks__/persons";
import mockRouter from "src/__mocks__/mockRouter";
import { DataProvider } from "src/providers/DataProvider/DataProvider";

describe("Pagination Component", () => {
  const routerPushMock = mockRouter({ page: 1 }, "test");
  const mockStore = createStore({
    persons: {
      selectedPersons: {},
    },
  });

  it("should updates URL query parameter when page changes", async () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <DataProvider details={{}} persons={{ count: 82, results: mockData }}>
          <Pagination />
        </DataProvider>
      </Provider>,
    );
    const page2Button = getByText("2");

    await act(async () => {
      fireEvent.click(page2Button);
    });

    expect(routerPushMock).toHaveBeenCalledWith({
      pathname: "test",
      query: { page: "2" },
    });
  });
});
