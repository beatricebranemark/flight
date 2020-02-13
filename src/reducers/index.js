import {combineReducers, createStore} from 'redux'

const getDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DATA': {
      return {...state, data: action.payload}
    }
    default:
  }
  return state
}

const reducers = combineReducers({
  getData: getDataReducer,
})

const store = createStore(reducers)

store.dispatch({
  type: 'SET_DATA',
  payload: '[]',
})

export default store
