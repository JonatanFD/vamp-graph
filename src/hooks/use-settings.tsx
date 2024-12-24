import { create } from "zustand";

export const DEFAULT_APP_SETTINGS  = {
    "colors": {
        "node": "#ffffff",
        "edge": "#ffffff",
        "weightText": "#ffffff",
        "weightBackground": "#000000",
        "selectedNode": "#0C59DF",
        "text": "#000000"
    },
    "canva": {
        "nodeRadius": 14,
        "nodeFontSize": 14,
        "edgeFontSize": 14
    }
}

interface AppColors {
    node: string,
    edge: string,
    weightBackground: string,
    weightText: string,
    selectedNode: string,
    text: string
}

interface CanvaSettings {
    nodeRadius: number,
    nodeFontSize: number,
    edgeFontSize: number
}

export interface AppSettings {
    colors: AppColors
    canva : CanvaSettings

    setAppSettings : (settings : AppSettingsData) => void
}

export interface AppSettingsData {
    colors: AppColors
    canva : CanvaSettings
}

export const useAppSettings = create<AppSettings>((set) => ({
    ...DEFAULT_APP_SETTINGS,
    setAppSettings : (settings : AppSettingsData) => set({...settings}),
}))