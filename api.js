  //Important Imports
const Express = require('express')
const Router = Express.Router();
const Hue = require("node-hue-api");
const HueApi = Hue.HueApi;
const LightState = Hue.lightState;
const config = require('dotenv').config().parsed;

//Imports Variables
var host = config.HOST
var username = config.USERNAME

var api = new HueApi(host, username);

//Update the light instance
var lightOn = true;
var lightBrightness = 100

var lightRed = 255;
var lightGreen = 255;
var lightBlue = 255;

function updateLights() {

  var state = LightState.create().white(0, lightBrightness).rgb(lightRed, lightGreen, lightBlue);

  api.setLightState(1, state.on(lightOn == 'true' || lightOn == true)).fail(err => {
    console.log(err);
  }).done();
}

//Recieve requests
Router.use((req, res, next) => {
    console.log(req.ip + " sent a " + req.method + " request to " + req.url);
    next();
});

Router.post('/basic', (req, res, next) => {
    lightOn = req.body.on;
    updateLights();

    return res.status(200).json({ success: true });
});

Router.post('/brightness', (req, res, next) => {
    lightBrightness = req.body.brightness;
    updateLights();

    return res.status(200).json({ success: true });
});

Router.post('/color', (req, res, next) => {
    var bigint = parseInt(req.body.color.replace('#', ''), 16);

    lightRed = (bigint >> 16) & 255;
    lightGreen = (bigint >> 8) & 255;
    lightBlue =  bigint & 255;

    updateLights();

    return res.status(200).json({ success: true });
});

module.exports = Router;
