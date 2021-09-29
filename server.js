const exp = require("express");
const bodyParser = require("body-parser")

const uploadFile= require('express-fileupload')



const {getGrayImage} = require("./handler_images/handlerImages")
const {makePredictions} = require("./prediction_images/recognition_objects")


// external libraries
const { Image } = require('image-js');

const app = exp();


app.use((req, res, next) => {
  // req es todo lo que el navegador esta enviando.
  // res es todo lo que se le devuelve al navegador.
  console.log(`urlRequerida:${req.url} - métodoRequerido:${req.method}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
  //se incorporan las cabeceras cors en las respuestas de http
});


app.use(uploadFile())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/gray", async (req, res) => {

  
 console.log("data", req.files.image.data)
 await  getGrayImage(req.files.image.data)
  
  
  res.json({
    dataRecieved: [],
    status: "ok",
    method: "delete",
  });
});


app.post("/recog-img", async (req, res) => {
  
  

  await getGrayImage(req.files.image.data)
  console.log(req.files.image)

  const dataImage={
    name:req.files.image,
    data:req.files.image.data,
    encoding:req.files.image.encoding,
    tempFilePath:req.files.image.tempFilePath,
    truncated:req.files.image.truncated,
    mimetype:req.files.image.mimetype
  }

  if(!req.files){ // 

    return res.status(400).json({
      ok:false,
      msg:'The require dont have any file'
    })

  }else if(dataImage.mimetype.split('/')[0]!='image'){

    return res.status(400).json({
      ok:false,
      msg:'The file sended not is a image'
    })

  }


  const predictions = await makePredictions(req.files.image.data).catch(err=>{
    return res.status(400).json({
      ok:false,
      msg:'Anything was wrong, please try again'
    })
  })

 
  
  res.json({
    dataRecieved: predictions,
    status: "ok",
    method: "delete",
  });
});





app.set("port", 3000);

app.listen(app.get("port"), () => {
  console.log(`listening by port ${app.get("port")}`);
});