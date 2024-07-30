import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchForm from "./SearchForm";
import useLocalStorage from "src/hooks/useLocalStorage/useLocalStorage";
import { store } from "src/store/store";
import { Provider } from "react-redux";
import mockData from "src/__mocks__/persons";
import mockRouter from "src/__mocks__/mockRouter";
import { DataProvider } from "src/providers/DataProvider/DataProvider";

jest.mock("src/hooks/useLocalStorage/useLocalStorage.ts");

describe("SearchForm", () => {
  const updateLocalStorageMock = jest.fn();
  const routerPushMock = mockRouter({}, "/detail/[id]");

  (useLocalStorage as jest.Mock).mockReturnValue(updateLocalStorageMock);

  it("should call updateLocalStorage callback and setSearchParams on form submit", async () => {
    render(
      <Provider store={store}>
        <DataProvider
          persons={{ count: 3, results: mockData }}
          details={mockData[0]}
        >
          <SearchForm />
        </DataProvider>
      </Provider>,
    );

    const input = screen.getByTestId("search-form-input");
    const button = screen.getByTestId("search-form-submit");

    await act(async () => {
      fireEvent.change(input, { target: { value: "test" } });
      fireEvent.click(button);
    });

    expect(updateLocalStorageMock).toHaveBeenCalledWith("test");
    expect(routerPushMock).toHaveBeenNthCalledWith(2, {
      pathname: "/detail/[id]",
      query: {
        page: "1",
        search: "test",
      },
    });
  });
});
