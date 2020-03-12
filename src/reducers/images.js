import * as types from "../actions/types"

const imagesReducer = (state = [], action) => {
  switch (action.type) {
    case types.APPEND_IMAGES:
      return [...new Set([...state, ...action.images])] // Set to ensure no duplicates
    case types.CLEAR_IMAGES:
      return []
    default:
      return state
  }
};

export default imagesReducer