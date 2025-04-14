export const IncidentTypes = [
  "sercurity",
  "technical",
  "complaint",
  "infrastructure",
  "other",
] as const;
export type IncidentType = (typeof IncidentTypes)[number];
