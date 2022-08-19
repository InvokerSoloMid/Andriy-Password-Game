import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { PasswordGameAction, State } from '../store.model';

const initialState: State = {
  keyValue: '',
  code: '',
};

export const passwordReducer = handleActions<State, string>(
  {
    SetCode: (
      state: State,
      action: PasswordGameAction
    ) => {
      return {
        ...state,
        code: action.payload
      }
    },
    SetCombination: (
      state: State,
      action: PasswordGameAction
    ) => {
      return {
        ...state,
        keyValue: action.payload,
      };
    },
  },
  initialState
);

const rootReducer = combineReducers({
  passwordReducer
});

export default rootReducer;