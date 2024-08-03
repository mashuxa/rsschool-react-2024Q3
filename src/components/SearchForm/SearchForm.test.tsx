import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchForm from "./SearchForm";
import useLocalStorage from "src/hooks/useLocalStorage/useLocalStorage";
import { store } from "src/store/store";
import { Provider } from "react-redux";
import {
  mockUsePathname,
  mockUseRouter,
  mockUseSearchParams,
} from "src/__mocks__/mockFn";

jest.mock("src/hooks/useLocalStorage/useLocalStorage.ts");

describe("SearchForm", () => {
  const updateLocalStorageMock = jest.fn();
  const routerPushMock = mockUseRouter();

  beforeAll(() => {
    (useLocalStorage as jest.Mock).mockReturnValue(updateLocalStorageMock);
    mockUseSearchParams("1");
    mockUsePathname("/detail/1");
  });

  it("should call updateLocalStorage callback and setSearchParams on form submit", async () => {
    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>,
    );

    const input = screen.getByTestId("search-form-input");
    const button = screen.getByTestId("search-form-submit");

    await act(async () => {
      fireEvent.change(input, { target: { value: "test" } });
      fireEvent.click(button);
    });

    expect(updateLocalStorageMock).toHaveBeenCalledWith("test");
    expect(routerPushMock).toHaveBeenNthCalledWith(
      2,
      "/detail/1?page=1&search=test",
    );
  });
});
