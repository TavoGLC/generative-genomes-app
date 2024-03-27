import * as tf from '@tensorflow/tfjs';

type SliderData = {
    latitude:number,
    doy:number,
    sunspots:number,
    bt:number
}

function daylength(J:number,lat:number){
    //CERES model  Ecological Modelling 80 (1995) 87-95
    const phi = 0.4093*Math.sin(0.0172*(J-82.2))
    const coef = (-Math.sin(Math.PI*lat/180)*Math.sin(phi)-0.1047)/(Math.cos(Math.PI*lat/180)*Math.cos(phi))
    const arg0 = Math.max(-0.87,coef)
    const ha =7.639*Math.acos(arg0)
    return ha
}

function MonthFromDay(day:number){
    var date = new Date(2024, 0)
    return new Date(date.setDate(day)).getUTCMonth() + 1
    }


function getWeekNumber(doy: number){
    // Copying date so the original date won't be modified

    var date = new Date(2024, 0)
    date = new Date(date.setDate(doy))

    const tempDate = new Date(date.valueOf());
    
    // ISO week date weeks start on Monday, so correct the day number
    const dayNum = (date.getDay() + 6) % 7;
    
    // Set the target to the nearest Thursday (current date + 4 - current day number)
    tempDate.setDate(tempDate.getDate() - dayNum + 3);
    
    // ISO 8601 week number of the year for this date
    const firstThursday = tempDate.valueOf();
    
    // Set the target to the first day of the year
    // First set the target to January 1st
    tempDate.setMonth(0, 1);
    
    // If this is not a Thursday, set the target to the next Thursday
    if (tempDate.getDay() !== 4) {
        tempDate.setMonth(0, 1 + ((4 - tempDate.getDay()) + 7) % 7);
    }
    
    // The weeknumber is the number of weeks between the first Thursday of the year
    // and the Thursday in the target week
    return 1 + Math.ceil((firstThursday - tempDate.valueOf()) / 604800000); // 604800000 = number of milliseconds in a week
    }
    
const LocalModelURL = 'http://localhost:3000/converter/model.json';
//const LocalModelURL = 'https://tlahui.vercel.app/composition/model.json';

async function ConverterModel(data:SliderData): Promise<any> {

    const dl = daylength(data.doy,data.latitude)
    const month = MonthFromDay(data.doy)
    const week = getWeekNumber(data.doy)

    const feats = [[month,week,data.doy,data.sunspots,dl,data.bt]]

    const Model = await tf.loadLayersModel(LocalModelURL);

    const localfeats = tf.tensor2d(feats)

    const localdata = (Model.predict(localfeats) as tf.Tensor)
    const forecasteddata = localdata.arraySync() as any

    return forecasteddata;
}

export { ConverterModel }