import * as types from "../actions/types"

const breedReducer = (state = {breed: 'pug', subBreed: ''}, action) => {
  switch (action.type) {
    case types.SELECT_BREED:
      return { breed: action.breed, subBreed: action.subBreed }
    default:
      return state
  }
};

export default breedReducer