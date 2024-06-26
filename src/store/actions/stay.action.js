import { stayService } from "../../services/stay.service";
import {
  ADD_STAY,
  REMOVE_STAY,
  SET_FILTER_BY,
  SET_IS_LOADING,
  SET_STAYS,
  UNDO_CHANGES,
  UPDATE_STAY,
} from "../reducers/stay.reducer";
import { store } from "../store";

export async function loadStays() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  try {
    const { filterBy } = store.getState().stayModule;
    const stays = await stayService.query(filterBy);
    store.dispatch({ type: SET_STAYS, stays });
  } catch (err) {
    console.log("Had issues loading stays", err);
    throw err;
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }
}
export async function removeStayOptimitic(stayId) {
  try {
    store.dispatch({ type: REMOVE_STAY, stayId });
    await stayService.remove(stayId);
  } catch (err) {
    console.log("Had issues removing stays", err);
    store.dispatch({ type: UNDO_CHANGES });
    throw err;
  }
}
export async function removeStay(stayId) {
  try {
    await stayService.remove(stayId);
    store.dispatch({ type: REMOVE_STAY, stayId });
  } catch (err) {
    console.log("Had issues removing stays", err);
    throw err;
  }
}
export async function saveStay(stay) {
  try {
    const type = stay._id ? UPDATE_STAY : ADD_STAY;
    const savedStay = await stayService.save(stay);
    store.dispatch({ type, stay: savedStay });
  } catch (err) {
    console.log("Had issues saving stays", err);
    throw err;
  }
}
export function setFilterBy(fieldsToUpdate) {
  store.dispatch({ type: SET_FILTER_BY, fieldsToUpdate });
}
