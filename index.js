import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.balldontlie.io/api/v1";

var page = 1;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , (req, res) => {
    res.render("index.ejs" , {imgPresent: true});
});

app.post("/" , (req, res) => {
    res.render("index.ejs" , {imgPresent: true});
});
app.post("/get-player" , async(req, res) => {
    try {
            let id = req.body.id;
            let name = req.body.name;
            if(id){
                const result = await axios.get(API_URL + "/players/" + id);
                res.render("index.ejs" , {player: result.data , nextPage: false ,imgPresent: false});
            } else if(name){
                const result = await axios.get(API_URL + "/players?search=" + name + "&per_page=100");
                res.render("index.ejs" , {players: result.data , nextPage: false , imgPresent: false});
            } else {
                const result = await axios.get(API_URL + "/players?per_page=30");
                res.render("index.ejs" , {players: result.data, nextPage: true , imgPresent: false});
            }        
        } catch (error) {
            console.log(error.message);
    }
});

app.post("/get-page" , async(req, res) => {
    try {
        page = page + 1;
        const result = await axios.get(API_URL + "/players?per_page=100&page=" + page);
        res.render("index.ejs" , {players: result.data , nextPage: true , imgPresent: false});    
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/get-team" , async(req, res) => {
    try {
        let id = req.body.id;
        if(id){
            const result = await axios.get(API_URL + "/teams/" + id);
            console.log(result.data);
            res.render("index.ejs" , {team: result.data , imgPresent: false});
        } else {
                const result = await axios.get(API_URL + "/teams");
                res.render("index.ejs" , {teams: result.data , imgPresent: false});    
        } 
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});