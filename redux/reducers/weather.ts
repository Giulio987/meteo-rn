import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityWeather } from '../..//models/weather';

export interface WeatherState {
  isLoading: boolean;
  error: string | null;
  cities: CityWeather[];
}

var initialState: WeatherState = {
  isLoading: false,
  error: null,
  cities: [],
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state: WeatherState, action: PayloadAction<CityWeather>) => {
      if (action.payload) {
        const index = state.cities.findIndex(
          (city) => city.name === action.payload.name
        );
        if (index !== -1) {
          //update all data except id
          let id = state.cities[index].id;
          action.payload.id = id;
          state.cities[index] = action.payload;
        } else {
          state.cities = [...state.cities, action.payload];
          //order state.cities by id like "c1", "c2", "c3"..
          state.cities.sort((a, b) => {
            return a.id.localeCompare(b.id);
          });
        }
      }
    },
    setCallState: (
      state: WeatherState,
      action: PayloadAction<{ isLoading: boolean; error: null | string }>
    ) => {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
  },
});

export const { setWeather, setCallState } = weatherSlice.actions;

export default weatherSlice.reducer;
