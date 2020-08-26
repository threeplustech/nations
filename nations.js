//document for manipulating the json file
const fs = require('fs');
var directory_path = '';
var nations = null;

module.exports = {

    setJson : function(path){
        var json_file = fs.readFileSync(path)
        nations = JSON.parse(json_file);
    },

    getCountries : function(){
        try{
            
            let countries = [];
            nations.forEach(nation => {
                countries.push({
                    "id": nation.id,
                    "name": nation.name,
                    "capital": nation.capital,
                    "currency": nation.currency,
                    "phone_code": nation.phone_code,
                    "iso2": nation.iso2,
                    "iso3": nation.iso3
                })
                
            });
            return countries;

        }catch(error){
            console.log(error);
            return null
        }
    },
    //country can be either name or id
    getStatesForCountry : function(country){
        try{
            let states = [];
            let c = nations.filter(nat => {return nat.id == country || nat.name == country})[0];
            c.states.forEach(state=>{
                states.push({
                    "id": state.id,
                    "name": state.name,
                    "state_code": state.state_code
                })
            })
            return states;

        }catch(error){
            console.log(error);
            return null
        }
    },

    getCityForState : function(country, state){
        try{
            let cities = [];
            let c = nations.filter(nat => {return nat.id == country || nat.name == country})[0];
            let s = c.states.filter(sta => {return sta.id == state || sta.name == state})[0];
            return s.cities;

        }catch(error){
            console.log(error);
            return null
        }
    }

}