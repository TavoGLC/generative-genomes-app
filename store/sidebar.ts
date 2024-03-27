import { create } from "zustand"

interface MainDisplayControl {
    toDisplay: "forecast" | "how";
    onForecast: () => void;
    onHow: () => void;
}

export const ToDisplayMain = create<MainDisplayControl>( (set) => ({
    toDisplay: "forecast",
    onForecast: () => set(() => ({toDisplay:"forecast"})),
    onHow: () => set(() => ({toDisplay:"how"})),
}))