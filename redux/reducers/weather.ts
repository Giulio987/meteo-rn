import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityWeather } from '../../shared/models/weather';

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
          (city) => city.id === action.payload.id
        );
        if (index !== -1) {
          state.cities[index] = action.payload;
        } else {
          state.cities = [...state.cities, action.payload];
          //order state.cities by id
          state.cities.sort((a, b) => a.id - b.id);
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
