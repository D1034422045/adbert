import { INCREMENT, RESET, TOGGLE_DISABLE } from "./actionTypes";

export const increment = () => ({ type: INCREMENT });
export const reset = () => ({ type: RESET });
export const toggleDisable = () => ({ type: TOGGLE_DISABLE });
