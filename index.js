const express = require("express");
const axios = require("axios");
const sharp = require("sharp");
const app = express();

// 1.Image Thumbnail generation endpoint:

app.get("/image", async (req, res) => {
  try {
    const url = req.query.url; //Extracting URL using Query Params

    if (!url) {
      res.status(400).send("Kindly Provide URL of an Image");
    }
    //Downloading Image Using Axios Call
    const result = await axios({
      url,
      responseType: "arraybuffer", //Setting the response to be BinaryBuffer used for BLOB
    });
    //Creating new Buffer Object from the response data
    const imageBuffer = Buffer.from(result.data);

    //Editing Image using Sharp and again converting to Buffer using toBuffer()
    const image = await sharp(imageBuffer).resize(50, 50).toBuffer();

    //Setting the Headers to image so that the client is aware of what data they are receiving
    res.set("Content-Type", "image/jpeg");
    res.send(image);
  } catch (err) {
    res.status(404).send({ message: err });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
