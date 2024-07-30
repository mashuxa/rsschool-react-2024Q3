import { render, screen } from "@testing-library/react";
import mockData from "src/__mocks__/persons";
import { act } from "react";
import { store } from "src/store/store";
import { Provider } from "react-redux";
import fetch from "jest-fetch-mock";
import Home from "../pages";
import mockRouter from "src/__mocks__/mockRouter";

describe("Home Page", () => {
  beforeAll(async () => {
    mockRouter({ page: 1 });
    fetch.mockResponse(
      JSON.stringify({ results: mockData, count: mockData.length }),
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <Home persons={{ count: 0, results: [] }} />
        </Provider>,
      );
    });
  });

  test("should render Layout", async () => {
    const layout = await screen.findByTestId("layout");

    expect(layout).toBeInTheDocument();
  });
});
