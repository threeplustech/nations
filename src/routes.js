module.exports = function (app, db) {
	app.get("/", (req, res, next) => {
		res.send("Welcome to the nations archive.");
	});

	app.get("/getCountries", (req, res, next) => {
		const nations = db.getCollection("countries");
		const countries = nations.find({}).map((nation) => ({
			id: nation.id,
			name: nation.name,
			capital: nation.capital,
			currency: nation.currency,
			phone_code: nation.phone_code,
			iso2: nation.iso2,
			iso3: nation.iso3,
		}));
		if (countries) {
			res.json({
				status: 200,
				data: { countries: countries },
				message: "Countries fetched successfully",
			});
		} else {
			res.json({
				status: 240,
				data: null,
				message: "Server error. Please contact admin.",
			});
		}
	});

	app.get("/getStatesForCountry/:country", (req, res, next) => {
		const nations = db.getCollection("countries");
		const country = nations.findOne({
			$or: [{ name: req.params.country }, { id: req.params.country }],
		});
		if (country) {
			var states = [];
			country.states.forEach((state) => {
				states.push({
					id: state.id,
					name: state.name,
					state_code: state.state_code,
				});
			});
			if (states.length > 0) {
				res.json({
					status: 200,
					data: { states: states },
					message: "States fetched successfully",
				});
			} else {
				res.json({
					status: 400,
					data: null,
					message: "Could not get states for this country",
				});
			}
		} else {
			res.json({
				status: 400,
				data: null,
				message: "Could not get states for this country",
			});
		}
	});

	app.get("/getCitiesForState/:country/:state", (req, res, next) => {
		const nations = db.getCollection("countries");
		const country = nations.findOne({
			$or: [{ name: req.params.country }, { id: req.params.country }],
		});
		if (country) {
			const state = country.states.find((o) => {
				return (
					o.id == req.params.state || o.name == req.params.state
				);
			});
			if (state) {
				res.json({
					status: 200,
					data: { cities: state.cities },
					message: "Cities fetched successfully",
				});
			} else {
				res.json({
					status: 400,
					data: null,
					message: "Could not get cities for this state",
				});
			}
		} else {
			res.json({
				status: 400,
				data: null,
				message: "Could not get cities for this country",
			});
		}
	});
};
