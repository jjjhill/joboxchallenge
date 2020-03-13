import * as types from "./types";

export function expandSidebar() {
  return {
    type: types.EXPAND_SIDEBAR
  }
}

export function collapseSidebar() {
  return {
    type: types.COLLAPSE_SIDEBAR
  }
}

export function collapseFullSidebar() {
  return {
    type: types.COLLAPSE_FULL_SIDEBAR
  }
}