export const createFieldValidationJobOpening = (
  value: "mandatory" | "optional" | "off",
) => {
  if (value === "off") {
    return {
      required: false,
      is_off: true,
    };
  }
  return {
    required: value === "mandatory",
  };
};
