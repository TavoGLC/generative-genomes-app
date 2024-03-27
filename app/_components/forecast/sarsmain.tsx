'use client'

import { ToDisplaySARS } from "@/store/sarsmode"

import { SARSForecastConverter } from "./sarsforecast_converter"
import { Button } from "@/components/ui/button"
import { MainFree } from "./mainfree"



interface WrapperProps{
    children: React.ReactNode
}

export const SARSMainDisplay = () => {

    const {toDisplay,onConverted,onFree} = ToDisplaySARS ((state) => state)

    const SARSModel = 'http://localhost:3000/decoder-sars/model.json';
    //const compositionModelURL = 'https://tlahui.vercel.app/composition/model.json';

    return(
        <div>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly">
                <p className="text-md sm:text-3xl"> SARS-Cov2 Forecasted Genome</p>
                <Button onClick={onConverted} variant="destructive"> <p className="text-sm sm:text-md"> Converted Mode </p>  </Button>
                <Button onClick={onFree} variant="destructive" > <p className="text-sm sm:text-md"> Free Mode </p> </Button>
            </div>
        
        <>
        {toDisplay==="converted" && (
            <div>
                <SARSForecastConverter/>
            </div>
        )}

        {toDisplay==="free" && (
            <div>
                <MainFree location={SARSModel} size={29850} />
            </div>
        )}
        </>
        </div>
    )
}
