const express = require("express");
const bodyParser = require("body-parser");
const https  = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("", function (req, res) {
	res.sendFile (__dirname + "/signup.html");

});


app.post("", function (req, res) {
	const fname = req.body.fname;
	const lname = req.body.lname;
	const email = req.body.email;

	const data = {
		members: [
		{
			email_address: email,
			status: "subscribed",
			merge_fields: {
				FNAME: fname,
				LNAME: lname
			}

		}
		]
	}

	const jsonData =  JSON.stringify(data);

	var url = //"mailchimpEndpoint/mailListCode";

	 var options = {
	 	method : "POST",
	 	auth: //"xyz:apiKey"

	}


	const request = https.request(url, options, function(response) {

		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else{
			res.sendFile(__dirname + "/misfiring.html");
		}


		
		response.on("data", function (data) {
			console.log(JSON.parse(data));


		})
		
	});

	request.write(jsonData);
	request.end();


});

app.post("/success", function (req, res) {
	res.redirect("/");
});

app.post("/misfiring", function (req, res) {
	res.redirect("/");
});

app.listen(process.env.PORT || 3000	 , function  (req, res) {
	console.log("Server running on port 3000 ....");
});

