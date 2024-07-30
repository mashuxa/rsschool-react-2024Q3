import mockData from "../__mocks__/persons";
import { generateCsvBlob, normalizePersons } from "./utils";
import { Person } from "src/types";

export const blobToData = (blob: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

describe("Utils", () => {
  test("normalizePersons: should create person id from url", () => {
    const { id, ...data } = mockData[0];
    const [personWithId] = normalizePersons([data as Person]);

    expect(personWithId.id).toBe(id);
  });

  test("normalizePersons: should return empty string if no any id in url", () => {
    const mockPerson = { ...mockData[0], url: "" };

    const [personWithId] = normalizePersons([mockPerson]);

    expect(personWithId.id).toBe("");
  });

  test("generateCsvBlob: should generate a CSV Blob from Person data", async () => {
    const blob = generateCsvBlob(mockData);
    const expectedCsvContent =
      "data:text/csv;base64,TmFtZSxCaXJ0aCBZZWFyLE1hc3MKTHVrZSBTa3l3YWxrZXIsMTlCQlksNzcKRGFydGggVmFkZXIsNDEuOUJCWSwxMzYKTGVpYSBPcmdhbmEsMTlCQlksNDkK";

    const data = await blobToData(blob);

    expect(data).toBe(expectedCsvContent);
  });
});
