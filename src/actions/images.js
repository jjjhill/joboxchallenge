import * as types from "./types";

export function appendImages(images) {
  return {
    type: types.APPEND_IMAGES,
    images
  }
}

export function clearImages() {
  return {
    type: types.CLEAR_IMAGES
  }
}