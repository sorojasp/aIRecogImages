const  {tf} = require ('@tensorflow/tfjs')
const cocoSSD =  require('@tensorflow-models/coco-ssd')
const { Image } = require('image-js');


/**
 * 
 * @param {*} imageBuffer 
 * @returns 
 */
 const makePredictions=  (imageBuffer)=>{
    return new Promise(async (resolve, reject)=>{

        let model_coco=null
        cocoSSD.load().then(async (model) => {
            console.log("model:", model)
             model_coco = model
             let image = await Image.load(imageBuffer);    
             const result = await model_coco.detect(image)
             console.log("result: ",result)
             resolve(result)
        
        })
        .catch(err => {
            console.log('Cannot load model', err)
            reject(err)
        
        });
        

    })

   

}







module.exports = {
    makePredictions,
  
}





