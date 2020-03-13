import * as types from "../actions/types"

const sidebarReducer = (state = { sidebarOpen: false, subSidebarOpen: false }, action) => {
  switch (action.type) {
    case types.EXPAND_SIDEBAR:
      if (state.sidebarOpen)
        return { ...state, subSidebarOpen: true }
      return { ...state, sidebarOpen: true }
    case types.COLLAPSE_SIDEBAR:
      if (state.subSidebarOpen)
        return { ...state, subSidebarOpen: false }
      return { ...state, sidebarOpen: false }
    case types.COLLAPSE_FULL_SIDEBAR:
      return { sidebarOpen: false, subSidebarOpen: false }
    default:
      return state
  }
};

export default sidebarReducer