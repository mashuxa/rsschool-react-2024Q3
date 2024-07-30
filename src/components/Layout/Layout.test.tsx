import { render, screen } from "@testing-library/react";
import useLoadingStatus from "src/hooks/useLoadingStatus/useLoadingStatus";
import Layout from "./Layout";
import { store } from "src/store/store";
import { Provider } from "react-redux";
import mockRouter from "src/__mocks__/mockRouter";

jest.mock("src/hooks/useLoadingStatus/useLoadingStatus");

describe("PersonDetails", () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <Layout />
      </Provider>,
    );
  };

  beforeAll(() => {
    mockRouter({ page: 1 });
  });

  test("should show loading indicator on fetching data", async () => {
    (useLoadingStatus as jest.Mock).mockReturnValue(true);

    renderComponent();

    const preloader = await screen.findByTestId("preloader");

    expect(preloader).toBeInTheDocument();
  });
});
