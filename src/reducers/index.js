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

const getOrgsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ORGANISATIONS': {
      return {...state, data: action.payload}
    }
    default:
  }
  return state
}

const getSchoolReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SCHOOLS': {
      return {...state, data: action.payload}
    }
    default:
  }
  return state
}

const reducers = combineReducers({
  getData: getDataReducer,
  getOrgs: getOrgsReducer,
  getSchools: getSchoolReducer,
})

const store = createStore(reducers)

store.dispatch({
  type: 'SET_DATA',
  payload: [],
})

store.dispatch({
  type: 'SET_ORGANISATIONS',
  payload: [],
})

store.dispatch({
  type: 'SET_SCHOOLS',
  payload: [],
})

export default store
