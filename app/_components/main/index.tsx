"use client"

import { MainForecast } from "../forecast"
import { MainHow } from "../how" 

import { ToDisplayMain } from "@/store/sidebar"

interface WrapperProps{
    children: React.ReactNode
}

export const MainDisplay = () => {

    const {toDisplay,onForecast,onHow} = ToDisplayMain ((state) => state)

    return(
        <>
        {toDisplay==="forecast" && (
            <div>
                <MainForecast/>
            </div>
        )}

        {toDisplay==="how" && (
            <div>
                <MainHow/>
            </div>
        )}
        </>
    )
}