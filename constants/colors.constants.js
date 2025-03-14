import { checkNull } from "../utils/utils";

export const ENUM_COLORS = {
  NEW: "cyan-400",
  ISSUE_TO_VENDOR: "cyan-400",
  READY_TO_PICK: "indigo-500",
  DISPATCHED: "green-400",
  COMPLETED: "green-400",
  INITIATED: "zinc-400",
  VOID: "yellow-400",
  READY_FOR_RECEIVING: "indigo-500",
  PARTIALLY_READY_FOR_RECEIVING: "slate-400",
  PARTIALLY_RECEIVED: "slate-400",
  ACTIVE: "#4ade80",
  NC: "#4ade80",
  COMPLETED_TITLE: "#f472b6",
  BOLTON: "#f472b6",
};

export const getColor = (key) => {
  if (checkNull(key)) {
    return "";
  }
  const newKey = key.replaceAll(" ", "_")?.toUpperCase();
  const color = ENUM_COLORS?.[newKey] ?? "";
  return color;
};
