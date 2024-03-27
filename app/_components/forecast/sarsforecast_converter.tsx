'use client'

import { useEffect, useState } from "react"
import { CompositionModel } from "./loadModel"
import { ToGenome } from "./togenome"
import { ConverterModel } from "./loadConverter"

export const SARSForecastConverter = () => {

    /* 
    Format and generate slider data
    */ 

    const [inputForm,setSliderValues] = useState({latitude:10,doy:10,sunspots:10,bt:3.5})

    const handleChange = (e:any) => setSliderValues({
        ...inputForm,
        [e.target.name]:e.target.value
    })

    const initialgenome =  'Loading Genome Data'
    const [genomeData, setGenomeData] = useState(initialgenome)

    
    useEffect(()=>{
        const FetchData = async () => {
        
            const conversion = await ConverterModel(inputForm)
            const compositionModelURL = 'http://localhost:3000/decoder-sars/model.json';
            //const compositionModelURL = 'https://tlahui.vercel.app/composition/model.json';
    
            const localData = {
                    'data':conversion,
                    'location':compositionModelURL,
                    'size':29850
                    }
    
            const genomeData = await CompositionModel(localData) 
            const genome = ToGenome(genomeData)
            setGenomeData(genome)
        }
        FetchData()}
        ,[inputForm])
    
    function dateFromDay(day:number){
        var date = new Date(2024, 0)
        return new Date(date.setDate(day)).toString().substr(3, 8) 
        }

    console.log()

    return(
        <div className="flex flex-col p-5 space-y-3">
            <div>
                <div>
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly">
                    <div className="basis-1/4">
                        <p className="text-md sm:text-xl font-semibold text-[#272728]">
                            Latitude
                        </p>
                        <input name="latitude" type="range" min={-70} max={70} value={inputForm.latitude} onChange={handleChange}
                        className="transparent h-[2px] border-transparent bg-[#eeeeee]"/>
                        
                    </div>
                    <div className="basis-1/4">
                        <p className="text-md sm:text-xl font-semibold text-[#272728]">
                            Day of year
                        </p>
                        <input name="doy" type="range" min={0} max={365} value={inputForm.doy} onChange={handleChange}
                        className="transparent h-[2px] border-transparent bg-[#eeeeee]" />
                    </div>
                    <div className="basis-1/4">
                        <p className="text-md sm:text-xl font-semibold text-[#272728]">
                            Sunspots
                        </p>
                        <input name="sunspots" type="range" min={0} max={200} value={inputForm.sunspots} onChange={handleChange}
                        className="transparent h-[2px] border-transparent bg-[#eeeeee]" />
                    </div>
                    <div className="basis-1/4">
                        <p className="text-md sm:text-xl font-semibold text-[#272728]">
                            Solar Magnetic Field
                        </p>
                        <input name="bt" type="range" min={3} max={7} value={inputForm.bt} onChange={handleChange}
                        className="transparent h-[2px] border-transparent bg-[#eeeeee]" />
                    </div>
                    </div>                
                </div>
            </div>

            <div className="flex flex-col justify-between space-y-3">
                <div>
                    <p className="flex text-md sm:text-2xl"> Predicted Genome for {dateFromDay(inputForm.doy)} at latitude {inputForm.latitude} and with {inputForm.sunspots} sunspots  </p>
                </div>
                <div>
                    <p className="flex text-sm text-justify max-h-[600px] overflow-auto"> {genomeData} </p>
                </div>
            </div>
        </div>
    )
}