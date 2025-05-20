export const IncidentTypes = [
  "sercurity",
  "technical",
  "complaint",
  "infrastructure",
  "other",
] as const;
export type IncidentType = (typeof IncidentTypes)[number];

export type IncidentHistoryType = {
  id: string;
  user_id: string;
  title: string;
  type: string;
  description: string;
  reported_at: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  priority: "low" | "medium" | "high";
};
