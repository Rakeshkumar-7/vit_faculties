const express = require('express');
const router = express.Router();
const fs = require('fs');

const fetchFaculties = require('../modules/fetchFaculties'); // require = PATH relative to current file
const APIkeys = JSON.parse(fs.readFileSync('./routes/database/APIkeys.json')); // PATH relative to main.js
const baseURL = "https://chennai.vit.ac.in/academics/schools/";
const schools = {
    "sas_phy": ["sas", "p"], // School of Advanced Sciences, Physics division
    "sas_mat": ["sas", "m"], // School of Advanced Sciences, Mathematics division
    "sas_chem": ["sas", "c"], // School of Advanced Sciences, Chemistry division
    "socialscience": "ssl",
    "computer": "scse",
    "electrical": "select",
    "electronic": "sense",
    "mechanical": "smbs",
    "civil": "smec",
    "law": "vitsol",
    "fashion": "vfit"
}

// ROOT/api/ROUTES

// Faculties
// Updates faculty list when program starts
fetchFaculties(schools, baseURL, true).then(() => {
    console.log(`Fetched the faculty list`);
});
// Timed function to scrap the faculty list every 3 days
const oneDay = 24*60*60*1000;
function fetchFacultiesAgain() {
    fetchFaculties(schools, baseURL, true).then(() => {
        console.log(`Fetched the faculty list`);
    });
}
setInterval(fetchFacultiesAgain, 7*oneDay); // Updates the faculty list once every 7 day

let errorMessage = {
    "error": "Unauthorized",
    "message": "Contact Admin(xxx@yyy.xyz) if you need access to our API"
};

router.route('/faculties')
.get((req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(errorMessage, null, 3));
    
    let date = new Date();
    let dateIST = new Date(date.getTime() - date.getTimezoneOffset()*60*1000).toISOString().substring(0,19).split('T').join(' ');
    console.log(`[${dateIST}] - [GET]: "api/faculties"`);
})
.post((req, res) => {
    res.setHeader("Content-Type", "application/json");
    let {key, reason} = req.body;
    if(APIkeys.keys.includes(key)){
        fetchFaculties(schools, baseURL).then((faculties) => {
            res.send(JSON.stringify(faculties, null, 3)); // Sending the data as JSON with some pretty formatting
        }).then(() => {
            let date = new Date();
            let dateIST = new Date(date.getTime() - date.getTimezoneOffset()*60*1000).toISOString().substring(0,19).split('T').join(' ');
            console.log(`[${dateIST}] - [POST]: "api/faculties" => Reason: ${reason}`);
        }); 
    }else{
        res.send(JSON.stringify(errorMessage, null, 3));
    }

});


module.exports = router;