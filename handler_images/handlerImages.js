// get instance of coco

const { Image } = require('image-js');

/**
 * The image can be stay in the root of the project 
 * @param {*} bufferData Buffer data of the image what you want work 
 */

 const  getGrayImage = async (bufferData)=>{
     

    let image = await Image.load(bufferData);
    
    
    let grey = image
      .grey() // convert the image to greyscale.
      .resize({ width: 200 }) // resize the image, forcing a width of 200 pixels. The height is computed automatically to preserve the aspect ratio.
      .rotate(30); // rotate the image clockwise by 30 degrees.
    grey.save('gray.png');
    
    
    }
    
    /**
     * 
     * @param {*} image reference of a object what you want to work
     */
    const getRGBarray =async (image)=>{
    
        let components = image.split();
        components[0].save('cat-red.jpg');
        components[1].save('cat-green.jpg');
        components[2].save('cat-blur.jpg');
      
        console.log("red: ", components[0].data[235])
    
    }
    
    
module.exports = {
    getGrayImage,
    getRGBarray
}
    