export type ProfileInformationField = {
  title: string;
  fields: {
    mandatory: "active" | "disabled";
    optional: "active" | "disabled";
    off: "active" | "disabled";
  };
};
