const express = require('express');
const base64ToImg = require('base64-to-image');
const fs = require("fs");

const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://api-us.faceplusplus.com/facepp/v3/detect';


router.get('/', (req, res) => {
  res.send('api works');
});


router.post('/judge', (req, res) => {
	const baseURL = "https://moodietoo.herokuapp.com";
	const imageURI = req.body.face;

	// convert this to an image face++ will understand (they say they can accept base64, but in my experience they can't)
	const image = base64ToImg(imageURI, "dist/temp/", {debug: true});
	//const imageUrl = baseURL + "/temp/" + image.fileName;
	const imageUrl = "http://faceresearch.org/uploads/base/white_male";
	
	const fppParams = {
		api_key: "6rH88UB11ggkHwhuljdWC0Bl0vujjUfs",
		api_secret: "gsKKbx40EBR2AbhWf4xVrX1wwAbzLAzU",
		return_attributes: "emotion",
		image_url: imageUrl
	};

	// send link to the image to f++ for evaluation
	axios.post(API, fppParams)
	.then(data => {
		var faceObj = JSON.parse(data);
		if( faceObj.hasOwnProperty("faces") ){
			res.status(200).json(faceObj.faces[0].attributes.emotion);
		}else{
			var feedback = {sadness: 0, neutral: 0, disgust: 0, anger: 0, surprise: 0, fear: 0, happiness: 0};
			res.json(feedback);
		};
	})
	.catch(error => {res.status(500).send(error)});
});

module.exports = router;