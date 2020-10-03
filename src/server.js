/**
 * @author Shritesh99 <shritesh.sj@gmail.com>
 *
 */
const express = require("express");
const loki = require("lokijs");
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");

// Env Vars
const port = process.env.PORT || 3000;

const jsonUrl =
	process.env.COUNTRY_STATE_CITY_JSON ||
	"https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json";

const refreshRate = process.env.REFRESH_RATE || 15 * 24 * 60 * 60 * 1000; // 15 Days

// Local DB
const db = new loki("csc.json", {
	env: "NODEJS",
	autoload: true,
	autoloadCallback: databaseInitialize,
	autosave: true,
	autosaveInterval: refreshRate,
});

function databaseInitialize() {
	if (!db.getCollection("countries")) {
		(async () => {
			const countries = db.addCollection("countries");
			await fetch(jsonUrl)
				.then((response) => response.json())
				.then((data) => {
					data.forEach((c) => countries.insert(c));
					db.save();
				});
		})();
	}
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require("./routes")(app, db);

app.listen(port, () => {
	console.log(`Nations app listening at http://localhost:3000`);
});
