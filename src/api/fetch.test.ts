import { fetchPersons, fetchDetails } from "./fetch";
import fetchMock from "jest-fetch-mock";
import { Person, FetchDataType } from "src/types";
import { API_URL } from "./constatnts";
import results from "src/__mocks__/persons";
import mockData from "src/__mocks__/persons";

describe("fetchPersons", () => {
  it("should fetch persons successfully", async () => {
    const mockData: FetchDataType<Person> = { count: 1, results };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchPersons("1", "test");

    expect(result).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}/people?page=1&search=test`,
    );
  });

  it("should return empty data on error", async () => {
    fetchMock.mockRejectOnce(new Error("API error"));

    const result = await fetchPersons("1", "123");

    expect(result).toEqual({ count: 0, results: [] });
  });
});

describe("fetchDetails", () => {
  it("should fetch person details successfully", async () => {
    const mockDetails: Partial<Person> = mockData[0];

    fetchMock.mockResponseOnce(JSON.stringify(mockDetails));

    const result = await fetchDetails("1");

    expect(result).toEqual(mockDetails);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/people/1`);
  });

  it("should return empty data on error", async () => {
    fetchMock.mockRejectOnce(new Error("API error"));

    const result = await fetchDetails("1");

    expect(result).toEqual({});
  });
});
