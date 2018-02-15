import {
  ADD_TODO,
  TOGGLE_TODO
} from '../actions/actionConst'


export function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
		  id: action.id,
          todos: action.text,
          //completed: false
        }
      ]
    default:
      return state
  }
}