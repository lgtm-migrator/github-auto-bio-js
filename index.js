const config = require("./config");
const fetch = require("node-fetch");
const url = "https://api.github.com/user";
const headers = {
    Authorization: "token " + config.token,
    "Content-Type": "application/json"
};
const url2 =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    config.weather +
    "&q=" +
    config.city;
async function main() {
    const bio_data = await getBio();
    const status = await postBio(bio_data);
    if (status.login) console.log("Bio updated!");
    else if (status.message) console.log(`Err: ${status.message}`);
};
async function getBio() {
    const response = await fetch(url2);
    const json = await response.json();
    const today = new Date();
    const time = today.toLocaleTimeString("it-IT");
    const result =
        "Current weather in " +
        config.city +
        ": " +
        json.weather[0].main.toUpperCase() +
        " | Last update: " +
        time +
        " | Made by SoulHarsh007 with JavaScript!";
    return result;
};
async function postBio(Bio) {
    const response = await fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: `{"bio": "${Bio}"}`
    });
    const json = await response.json();
    return json;
};
main();
setInterval(main, 5 * 60 * 1000);