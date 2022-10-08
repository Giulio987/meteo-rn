import { CityWeather } from '../models/weather';
import Colors from '../styles/Colors';

const cloudy = require('../assets/Cloudy.png');
const rainy = require('../assets/OccLightRain.png');
const sunny = require('../assets/Sunny.png');
const modRainSwrsDay = require('../assets/ModRainSwrsDay.png');

const getImageAndStyleFromWeather = (
  id: number,
  weather: string,
  cityId: number
) => {
  switch (weather) {
    case 'Clouds':
      return {
        image: cloudy,
        style: {
          first: Colors.cloudy.main,
          second: Colors.cloudy.light,
        },
      };
    case 'Rain':
      if (id === 500 || id === 501 || id === 502 || id === 503 || id === 504) {
        return {
          image: modRainSwrsDay,
          style: {
            first: Colors.rainy.main,
            second: Colors.rainy.light,
          },
        };
      } else
        return {
          image: rainy,
          style: {
            first: Colors.rainy.main,
            second: Colors.rainy.light,
          },
        };
    case 'Clear':
      return {
        image: sunny,
        style: {
          first: Colors.sunny.main,
          second: Colors.sunny.light,
        },
      };
    //TODO capire se mettere anche il pioggia/Sole come su invision
    default:
      return {
        image: sunny,
        style: {
          first: Colors.sunny.main,
          second: Colors.sunny.light,
        },
      };
  }
};

export const getHourlyFormat = (dt: number) => {
  const formattedHour =
    new Date(dt * 1000)
      .toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .split(' ')[0]
      .split(':')[0] +
    ' ' +
    new Date(dt * 1000)
      .toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .split(' ')[1];
  return formattedHour;
};

export const getArrayOfTabs = (cityWeather: CityWeather) => {
  if (cityWeather) {
    const dailyWeather = cityWeather.dailyWeather;
    //create an array with dailyWeather elements divided by 3
    const arrayOfTabs = [];
    for (let i = 0; i < dailyWeather.length; i += 3) {
      arrayOfTabs.push(dailyWeather.slice(i, i + 3));
    }
    return arrayOfTabs;
  } else return [];
};

export const getFormattedDate = (dt: string) => {
  return [`${dt.split(' ')[0]} ${dt.split(' ')[1]},`, dt.split(' ')[2]];
};

export default getImageAndStyleFromWeather;
