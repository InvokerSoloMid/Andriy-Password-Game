export interface State {
  keyValue: string,
  code: string
};

export interface PasswordGameAction {
  type: string,
  payload: string
};

export const ActionTypes = {
  SET_CODE: 'SetCode',
  SET_COMBINATION: 'SetCombination',
};