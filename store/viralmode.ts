import { create } from "zustand"

interface DisplayControlViral {
    toDisplay: "SARS" | "DENV" | "VHB"| "INFHA" | "INFNEU";
    onSARS: () => void;
    onDENV: () => void;
    onVHB: () => void;
    onINFHA: () => void;
    onINFNEU: () => void;

}

export const ToDisplayViral = create<DisplayControlViral>( (set) => ({
    toDisplay: "SARS",
    onSARS: () => set(() => ({toDisplay:"SARS"})),
    onDENV: () => set(() => ({toDisplay:"DENV"})),
    onVHB: () => set(() => ({toDisplay:"VHB"})),
    onINFHA: () => set(() => ({toDisplay:"INFHA"})),
    onINFNEU: () => set(() => ({toDisplay:"INFNEU"})),
}))