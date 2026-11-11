import { isBoolean, preference } from "./preference";

export const preferences = {
  sidebarOpen: preference(
    "maximus.sidebar.open",
    () => !matchMedia("(max-width: 800px)").matches,
    isBoolean,
  ),
};
