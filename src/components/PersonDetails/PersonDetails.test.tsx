import { render, screen } from "@testing-library/react";
import PersonDetails from "src/components/PersonDetails/PersonDetails";
import mockData from "src/__mocks__/persons";
import mockRouter from "src/__mocks__/mockRouter";
import { DataProvider } from "src/providers/DataProvider/DataProvider";

jest.mock("src/hooks/useLoadingStatus/useLoadingStatus");

describe("PersonDetails", () => {
  const renderComponent = () => {
    render(
      <DataProvider persons={{ count: 0, results: [] }} details={mockData[0]}>
        <PersonDetails />
      </DataProvider>,
    );
  };

  beforeAll(() => {
    mockRouter({ page: 1 });
  });

  test("should render detailed card component correctly", async () => {
    renderComponent();

    expect(await screen.findByTestId("detailed-card-name")).toHaveTextContent(
      "Luke Skywalker",
    );
    expect(await screen.findByTestId("detailed-card-height")).toHaveTextContent(
      "Height: 172 cm",
    );
    expect(await screen.findByTestId("detailed-card-mass")).toHaveTextContent(
      "Mass: 77 kg",
    );
    expect(await screen.findByTestId("detailed-card-hair")).toHaveTextContent(
      "Hair Color: blond",
    );
    expect(await screen.findByTestId("detailed-card-skin")).toHaveTextContent(
      "Skin Color: fair",
    );
    expect(await screen.findByTestId("detailed-card-eye")).toHaveTextContent(
      "Eye Color: blue",
    );
    expect(await screen.findByTestId("detailed-card-year")).toHaveTextContent(
      "Birth Year: 19BBY",
    );
    expect(await screen.findByTestId("detailed-card-gender")).toHaveTextContent(
      "Gender: male",
    );
  });
});
