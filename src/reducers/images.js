import * as types from "../actions/types"

const imagesReducer = (state = {images: [], columns: []}, action) => {
  switch (action.type) {
    case types.APPEND_IMAGES:
      return {...state, images: [...new Set([...state.images, ...action.images])]} // Set to ensure no duplicates
    case types.CLEAR_IMAGES:
      return {columns: [], images: []}
    default:
      return state
  }
};

export default imagesReducer