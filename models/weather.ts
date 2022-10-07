import { CSSProperties } from 'react';

export interface CityWeather {
  id: number;
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
