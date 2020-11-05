# Newsletter-Signup
Mailchimp API newsletter signup

built using mailchimp's API for adding new users to your mailchimp List

## Server Starting Code
```javascript

const express = require("express");
const bodyParser = require("body-parser");
const https  = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

```

## MailChimp Integration 

```javascript

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

	let url = //"mailchimpEndpoint/mailListCode";

	 let options = {
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

```
