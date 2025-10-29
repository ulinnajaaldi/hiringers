import { firstLetterUppercase, mappingJobTypeDisplayText } from "@/lib/text";

describe("text.ts utilities", () => {
  describe("firstLetterUppercase", () => {
    it("should capitalize the first letter", () => {
      expect(firstLetterUppercase("hello")).toBe("Hello");
      expect(firstLetterUppercase("world")).toBe("World");
    });

    it("should handle edge cases", () => {
      expect(firstLetterUppercase("")).toBe("");
      expect(firstLetterUppercase(null as any)).toBe(null);
      expect(firstLetterUppercase(undefined as any)).toBe(undefined);
    });

    it("should only capitalize first letter, keep rest as-is", () => {
      expect(firstLetterUppercase("hello world")).toBe("Hello world");
      expect(firstLetterUppercase("hELLO")).toBe("HELLO");
    });
  });

  describe("mappingJobTypeDisplayText", () => {
    it("should have correct job type mappings", () => {
      expect(mappingJobTypeDisplayText.full_time).toBe("Full-time");
      expect(mappingJobTypeDisplayText.part_time).toBe("Part-time");
      expect(mappingJobTypeDisplayText.contract).toBe("Contract");
      expect(mappingJobTypeDisplayText.internship).toBe("Internship");
      expect(mappingJobTypeDisplayText.freelance).toBe("Freelance");
    });

    it("should have exactly 5 job types", () => {
      expect(Object.keys(mappingJobTypeDisplayText)).toHaveLength(5);
    });
  });
});
