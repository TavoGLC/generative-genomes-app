import * as tf from '@tensorflow/tfjs';

type ModelType = {
    data:any[]
    location:string,
    size:number
}

function argmax(arr:number[]) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

async function CompositionModel(data:ModelType): Promise<any> {
    
    const compositionModel = await tf.loadLayersModel(data.location);
    const ardata = tf.tensor2d(data.data)
    const localdata = (compositionModel.predict(ardata) as tf.Tensor)
    const forecasteddata = localdata.arraySync() as any

    const localdecoded = []

    for (let i=0; i< data.size; i++) {
        localdecoded.push(argmax(forecasteddata[0][i]))
        }
    
    return localdecoded;
}

export { CompositionModel }