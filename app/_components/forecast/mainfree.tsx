'use client'

import { useEffect, useState } from "react"
import { CompositionModel } from "./loadModel"
import { ToGenome } from "./togenome"

type inferenceData = {
    location:string,
    size:number
}

export const MainFree = (props:inferenceData) => {

    /* 
    Format and generate slider data
    */ 

    const [inputForm,setSliderValues] = useState({param1:0,param2:0})

    const handleChange = (e:any) => setSliderValues({
        ...inputForm,
        [e.target.name]:e.target.value
    })

    const initialgenome =  'Loading Genome Data'
    const [genomeData, setGenomeData] = useState(initialgenome)

    
    useEffect(()=>{
        const FetchData = async (props:inferenceData) => {

            const conversion = [[Number(inputForm.param1),Number(inputForm.param2)]]
            const localData = {
                'data':conversion,
                'location':props.location,
                'size':props.size
                }
    
            const genomeData = await CompositionModel(localData) 
            const genome = ToGenome(genomeData)
            setGenomeData(genome)
        }
        FetchData(props)}
        ,[inputForm,props])

    return(
        <div className="flex flex-col p-5 space-y-3">
            <div>
                <div>
                    <div className="flex justify-center">
                    <div className="basis-1/4">
                        <p className="text-md sm:text-xl font-semibold text-[#272728]">
                            Parameter 1 
                        </p>
                        <input name="param1" type="range" min={-2} max={2} step={0.1} value={inputForm.param1} onChange={handleChange}
                        className="transparent h-[2px] border-transparent bg-[#eeeeee]"/>
                        
                    </div>
                    <div className="basis-1/4">
                        <p className="text-md sm:text-xl font-semibold text-[#272728]">
                            Parameter 2
                        </p>
                        <input name="param2" type="range" min={-2} max={2} step={0.1} value={inputForm.param2} onChange={handleChange}
                        className="transparent h-[2px] border-transparent bg-[#eeeeee]" />
                    </div>
                    </div>                
                </div>
            </div>

            <div className="flex flex-col justify-between space-y-3">
                <div>
                    <p className="flex text-2xl"> Predicted Genome at {inputForm.param1} for parameter 1 and {inputForm.param2} for parameter 2  </p>
                </div>
                <div>
                    <p className="flex text-sm text-justify max-h-[600px] overflow-auto"> {genomeData} </p>
                </div> 
            </div>
        </div>
    )
}