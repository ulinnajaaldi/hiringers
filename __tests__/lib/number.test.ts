import {
  formatNumber,
  parseFormattedNumber,
  preprocessStringToNumber,
} from "@/lib/number";

describe("number.ts utilities", () => {
  describe("preprocessStringToNumber", () => {
    it("should convert numeric string to number", () => {
      expect(preprocessStringToNumber("123")).toBe(123);
      expect(preprocessStringToNumber("123.45")).toBe(123.45);
    });

    it("should return undefined for empty/null/undefined", () => {
      expect(preprocessStringToNumber("")).toBeUndefined();
      expect(preprocessStringToNumber(null)).toBeUndefined();
      expect(preprocessStringToNumber(undefined)).toBeUndefined();
    });

    it("should return original value for non-numeric strings", () => {
      expect(preprocessStringToNumber("abc")).toBe("abc");
    });
  });

  describe("formatNumber", () => {
    it("should format numbers with Indonesian locale", () => {
      expect(formatNumber(1000)).toBe("1.000");
      expect(formatNumber(1000000)).toBe("1.000.000");
      expect(formatNumber(1234.56)).toBe("1.234,56");
    });

    it("should return empty string for invalid inputs", () => {
      expect(formatNumber("")).toBe("");
      expect(formatNumber(null as any)).toBe("");
      expect(formatNumber("abc")).toBe("");
    });

    it("should handle Infinity", () => {
      expect(formatNumber(Infinity)).toBe("∞");
      expect(formatNumber(-Infinity)).toBe("-∞");
    });
  });

  describe("parseFormattedNumber", () => {
    it("should parse Indonesian formatted numbers", () => {
      expect(parseFormattedNumber("1.000")).toBe(1000);
      expect(parseFormattedNumber("1.000.000")).toBe(1000000);
    });

    it("should return 0 for invalid inputs", () => {
      expect(parseFormattedNumber("")).toBe(0);
      expect(parseFormattedNumber(null as any)).toBe(0);
      expect(parseFormattedNumber("abc")).toBe(0);
    });
  });

  describe("Integration tests", () => {
    it("should format and parse numbers reversibly", () => {
      const original = 1234567;
      const formatted = formatNumber(original);
      const parsed = parseFormattedNumber(formatted);
      expect(parsed).toBe(original);
    });

    it("should handle salary formatting", () => {
      const salary = 5000000;
      expect(formatNumber(salary)).toBe("5.000.000");
      expect(parseFormattedNumber("5.000.000")).toBe(salary);
    });
  });
});
