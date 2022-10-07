import weatherReducer from './weather';
import { combineReducers } from 'redux';

//Solo per l'esportazione del tipo corretto
const rootReducer = combineReducers({
  weather: weatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
