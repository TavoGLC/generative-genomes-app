import { create } from "zustand"

interface DisplayControlSARS {
    toDisplay: "converted" | "free";
    onConverted: () => void;
    onFree: () => void;
}

export const ToDisplaySARS = create<DisplayControlSARS>( (set) => ({
    toDisplay: "converted",
    onConverted: () => set(() => ({toDisplay:"converted"})),
    onFree: () => set(() => ({toDisplay:"free"})),
}))