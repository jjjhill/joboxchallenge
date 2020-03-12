import * as types from "./types";

export function selectBreed(breed, subBreed) {
  return {
    type: types.SELECT_BREED,
    breed,
    subBreed
  }
}