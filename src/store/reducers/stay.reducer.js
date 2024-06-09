import { stayService } from "../../services/stay.service";
export const SET_STAYS = "SET_STAYS";
export const REMOVE_STAY = "REMOVE_STAY";
export const UPDATE_STAY = "UPDATE_STAY";
export const ADD_STAY = "ADD_STAY";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const UNDO_CHANGES = "UNDO_CHANGES";
const initialState = {
  stays: null,
  lastStays: [],
  filterBy: stayService.getDefaultFilter(),
  isLoading: true,
};
export function stayReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_STAYS:
      return {
        ...state,
        stays: cmd.stays,
      };
    case REMOVE_STAY:
      return {
        ...state,
        lastStays: [...state.stays],
        stays: state.stays.filter((stay) => stay.id !== cmd.stayId),
      };
    case ADD_STAY:
      return {
        ...state,
        stays: [...state.stays, cmd.stay],
      };
    case UPDATE_STAY:
      return {
        ...state,
        stays: state.stays.map((stay) =>
          stay.id === cmd.stay.id ? cmd.stay : stay
        ),
      };
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...state.filterBy, ...cmd.fieldsToUpdate },
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: cmd.isLoading,
      };
    case UNDO_CHANGES:
      return {
        ...state,
        stays: [...state.lastStays],
      };
    default:
      return state;
  }
}
