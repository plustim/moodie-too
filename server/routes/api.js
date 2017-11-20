const express = require('express');
const base64ToImg = require('base64-to-image');
const fs = require("fs");
const https = require("https");
https.post = require("https-post");

const router = express.Router();

router.get('/', (req, res) => {
  res.send('api works');
});


router.post('/judge', (req, res) => {
	const baseURL = "https://moodie-too.herokuapp.com/";
	const imageURI = req.body.face;

	// convert this to an image face++ will understand (they say they can accept base64, but in my experience they can't)
	const image = base64ToImg(imageURI, "dist/temp/", {debug: true});
	const imageUrl = baseURL + "/temp/" + image.fileName;
	
	const fppParams = {
		api_key: "6rH88UB11ggkHwhuljdWC0Bl0vujjUfs",
		api_secret: "gsKKbx40EBR2AbhWf4xVrX1wwAbzLAzU",
		return_attributes: "emotion",
		image_url: imageUrl
	};

	// send link to the image to f++ for evaluation
	https.post("https://api-us.faceplusplus.com/facepp/v3/detect", fppParams, function(response){
		response.setEncoding('utf8');
		response.on('data', chunk => {
			const faceObj = JSON.parse(chunk);
			console.log("FACE: ", faceObj.faces[0].attributes.emotion);
			if( faceObj.hasOwnProperty("faces") ){
				res.status(200).json(faceObj.faces[0].attributes.emotion);
			}else{
				var feedback = {sadness: 0, neutral: 0, disgust: 0, anger: 0, surprise: 0, fear: 0, happiness: 0};
				res.json(feedback);
			};
		});
	});
});

module.exports = router;