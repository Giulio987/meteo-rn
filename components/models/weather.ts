import { CSSProperties } from 'react';

export interface CityToDispatch {
  name: string;
  country: string;
  id: string;
  coord: { lat: number; lon: number };
}

export interface CityWeather {
  id: string;
  name: string;
  mainWeather: {
    main: string;
    temperature: number;
    localeDate: string;
    localTime: string;
    image: string;
    style: {
      first: string;
      second: string;
    };
  };
  hourlyTemperatures: HourlyTemperatures[];
  dailyWeather: DailyWeather[];
}

export interface HourlyTemperatures {
  temperature: number;
  localTime: string;
}

export interface DailyWeather {
  main: string;
  temperature: number;
  localeDate: string;
  image: string;
}
