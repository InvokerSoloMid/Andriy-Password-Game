import { createAction } from "redux-actions";
import { ActionTypes } from "../store.model";

export const SetCode = createAction<string>(ActionTypes.SET_CODE);
export const SetCombination = createAction<string>(ActionTypes.SET_COMBINATION);