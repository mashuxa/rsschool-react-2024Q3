import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { act } from "react";
import { Provider } from "react-redux";
import { createStore } from "src/store/store";
import {
  mockUsePathname,
  mockUseRouter,
  mockUseSearchParams,
} from "src/__mocks__/mockFn";

describe("Pagination Component", () => {
  const mockStore = createStore({
    persons: {
      selectedPersons: {},
    },
  });
  const routerPushMock = mockUseRouter();

  beforeAll(() => {
    mockUseSearchParams("1");
    mockUsePathname();
  });

  it("should updates URL query parameter when page changes", async () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <Pagination count={82} />
      </Provider>,
    );
    const page2Button = getByText("2");

    await act(async () => {
      fireEvent.click(page2Button);
    });

    expect(routerPushMock).toHaveBeenCalledWith("?page=2&search=");
  });
});
