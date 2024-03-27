'use client'

import { Button } from "@/components/ui/button";
import { SARSMainDisplay } from "./sarsmain";
import { ToDisplayViral } from "@/store/viralmode";
import { MainFree } from "./mainfree";


export const MainForecast = () => {

    const {toDisplay,onSARS,onDENV,onVHB,onINFHA,onINFNEU} = ToDisplayViral ((state) => state)

    const DENVModelURL = 'http://localhost:3000/decoder-denv/model.json';
    //const DENVModelURL = 'https://tlahui.vercel.app/composition/model.json';
    const VHBModelURL = 'http://localhost:3000/decoder-vhb/model.json';
    //const compositionModelURL = 'https://tlahui.vercel.app/composition/model.json';

    const INFHAModelURL = 'http://localhost:3000/decoder-infha/model.json';
    //const DENVModelURL = 'https://tlahui.vercel.app/composition/model.json';
    const INFNEUModelURL = 'http://localhost:3000/decoder-infneu/model.json';
    //const compositionModelURL = 'https://tlahui.vercel.app/composition/model.json';

    return(
        <div>
            <div>
                <p className="text-xl sm:text-3xl"> Viral Genome Forecasting With Generative AI</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-evenly p-5 space-y-3 justify-between"> 
                <Button onClick={onSARS} > SARS Cov2 </Button>
                <Button onClick={onDENV} > Dengue </Button>
                <Button onClick={onVHB}> Hepatitis B </Button>
                <Button onClick={onINFHA}> Influenza Hemagglutinin </Button>
                <Button onClick={onINFNEU}>  Influenza Neuraminidase </Button>
            </div>
            {toDisplay==="SARS" && (
            <div>
                <SARSMainDisplay/>
            </div>
            )}
            {toDisplay==="DENV" && (
            <div>
                <div className="flex flex-row justify-evenly">
                <p className="text-3xl"> Dengue Forecasted Genome</p>
                </div>
                <MainFree location={DENVModelURL} size={11200}/>
            </div>
            )}
            {toDisplay==="VHB" && (
            <div>
            <div className="flex flex-row justify-evenly">
            <p className="text-3xl"> Hepatitis B Forecasted Genome</p>
            </div>
            <MainFree location={VHBModelURL} size={3500}/>
        </div>
            )}
            {toDisplay==="INFHA" && (
            <div>
            <div className="flex flex-row justify-evenly">
            <p className="text-3xl"> Influenza Hemagglutinin gene</p>
            </div>
            <MainFree location={INFHAModelURL} size={1800}/>
        </div>
            )}
            {toDisplay==="INFNEU" && (
            <div>
            <div className="flex flex-row justify-evenly">
            <p className="text-3xl"> Influenza Neuraminidase Gene</p>
            </div>
            <MainFree location={INFNEUModelURL} size={1650}/>
        </div>
            )}
        </div>
    )
}