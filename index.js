const config = require('./config');
const {centra} = require('@nia3208/centra');
/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @async
 * @copyright SoulHarsh007 2021
 * @since v1.0.0
 * @function main
 * @description The main function, responsible for logging and calling functions
 */
const main = async () => {
  const bioData = await getBio();
  const status = await postBio(bioData);
  if (status.login) {
    console.log('Bio updated!');
  } else if (status.message) {
    console.log(`Err: ${status.message}`);
  }
};
/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @async
 * @copyright SoulHarsh007 2021
 * @since v1.0.0
 * @function getBio
 * @description The getBio function, responsible for generating bio and getting weather information from openweathermap api
 * @returns {Promise<string>} bio string
 */
const getBio = async () => {
  const response = await centra(
    'https://api.openweathermap.org/data/2.5/weather',
    'GET'
  )
    .query({
      appid: config.weather,
      q: config.city,
    })
    .json();
  return `Current weather in ${
    config.city
  } : ${response.weather[0].main.toUpperCase()} | Last update: ${new Date().toLocaleTimeString(
    'it-IT'
  )} | Made by SoulHarsh007 with JavaScript!`;
};
/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @async
 * @copyright SoulHarsh007 2021
 * @since v1.0.0
 * @function postBio
 * @description The postBio function, responsible for posting bio to github
 * @param {string} bio - The bio to post
 * @returns {Promise<any>} the response from github server
 */
const postBio = async bio =>
  await centra('https://api.github.com/user', 'PATCH')
    .body(
      {
        bio,
      },
      'JSON'
    )
    .header({
      Authorization: `token ${config.token}`,
      'User-Agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
    })
    .json();
main();
setInterval(main, 5 * 60 * 1000);
