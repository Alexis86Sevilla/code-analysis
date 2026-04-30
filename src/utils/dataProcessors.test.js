import { describe, expect, it } from "vitest";
import { processActivityData, processLanguageData } from "./dataProcessors.js";

describe("processActivityData", () => {
  it("should return empty arrays for invalid data", () => {
    const result = processActivityData(null);
    expect(result.dateAxis).toEqual([]);
    expect(result.totalCommits).toEqual([]);
  });

  it("should process commits and group by month and year", () => {
    const mockData = [
      { week: 1714514400, total: 10 }, // tiene que devolver may 2024
      { week: 1717202400, total: 5 }, // tiene que devolver june 2024
      { week: 1714514400 + 7 * 24 * 3600, total: 20 }, // tiene que devolver may 2024
    ];
    const result = processActivityData(mockData);

    expect(result.dateAxis).toContain("may 24");
    expect(result.dateAxis).toContain("jun 24");
    expect(result.totalCommits[result.dateAxis.indexOf("may 24")]).toBe(30);
    expect(result.totalCommits[result.dateAxis.indexOf("jun 24")]).toBe(5);
  });
});

describe("processLanguageData", () => {
  it("should return empty arrays for invalid data", () => {
    const result = processLanguageData(null);
    expect(result.names).toEqual([]);
    expect(result.percentages).toEqual([]);
  });

  it("should process languages and calculate percentages", () => {
    const mockData = {
      JS: 100,
      TS: 100,
      A: 10,
      B: 10,
      C: 10,
      D: 10,
      E: 10,
      F: 10,
      G: 10,
      H: 10,
      I: 10,
    };
    const result = processLanguageData(mockData);
    expect(result.names).toEqual([
      "JS",
      "TS",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "Otros",
    ]);
    expect(result.percentages[0]).toBeCloseTo(34.48, 1);
    expect(result.percentages[1]).toBeCloseTo(34.48, 1);
    expect(result.percentages[2]).toBeCloseTo(3.44, 1);
  });
});
