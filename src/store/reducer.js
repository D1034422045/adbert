import { INCREMENT, RESET, TOGGLE_DISABLE } from "./actionTypes";

const initialState = {
  count: 0,
  isDisable: false,
};

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case RESET:
      return { ...state, count: 0 };
    case TOGGLE_DISABLE:
      return { ...state, isDisable: !state.isDisable };
    default:
      return state;
  }
}
