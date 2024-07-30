import { render, screen } from "@testing-library/react";
import StoreProvider from "./StoreProvider";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const TestComponent = () => {
  const selectedPersons = useSelector(
    (state: RootState) => state.persons.selectedPersons,
  );

  return <div data-testid="state">{JSON.stringify(selectedPersons)}</div>;
};

describe("StoreProvider", () => {
  test("should dispatch actions to the store", () => {
    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>,
    );

    const state = screen.getByTestId("state");

    expect(state).toHaveTextContent("{}");
  });
});
