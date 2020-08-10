const config = require('./config');
const centra = require('@aero/centra');
const main = async () => {
  const bioData = await getBio();
  const status = await postBio(bioData);
  if (status.login) console.log('Bio updated!');
  else if (status.message) console.log(`Err: ${status.message}`);
};
const getBio = async () => {
  const response = await centra(
    'https://api.openweathermap.org/data/2.5/weather',
    'GET'
  )
    .query({appid: config.weather, q: config.city})
    .json();
  const today = new Date();
  const time = today.toLocaleTimeString('it-IT');
  return (
    'Current weather in ' +
    config.city +
    ': ' +
    response.weather[0].main.toUpperCase() +
    ' | Last update: ' +
    time +
    ' | Made by SoulHarsh007 with JavaScript!'
  );
};
const postBio = async Bio => {
  const response = await centra('https://api.github.com/user', 'PATCH')
    .body({bio: Bio}, 'JSON')
    .header({
      Authorization: `token ${config.token}`,
      'User-Agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
    })
    .json();
  return response;
};
main();
setInterval(main, 5 * 60 * 1000);
