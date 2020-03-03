import {combineReducers, createStore} from 'redux'
import Filter from '../components/Filter'

const getDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DATA': {
      return {...state, data: action.payload}
    }
    default:
  }
  return state
}

const getBarDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BAR_DATA': {
      return {...state, data: action.payload}
    }
    default:
  }
  return state
}

const getMapDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MAP_DATA': {
      return {...state, data: action.payload}
    }
    default:
  }
  return state
}

const getPersonDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PERSON_DATA': {
      return {...state, data: action.payload}
    }
    default:
  }
  return state
}

const getHoverReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_HOVER_DATA': {
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

const getSelectedOrgsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ORGANISATION': {
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

const getSelectedSchoolReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_SCHOOL': {
      return {...state, data: action.payload}
    }
    default:
  }
  return state
}

const getFilterOptionsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FILTERING': {
      return {...state, data: action.payload}
    }
    default:
  }
  return state
}

const reducers = combineReducers({
  getData: getDataReducer,
  getBar: getBarDataReducer,
  getMap: getMapDataReducer,
  getPerson: getPersonDataReducer,
  getHover: getHoverReducer,
  getOrgs: getOrgsReducer,
  getSelectedOrg: getSelectedOrgsReducer,
  getSchools: getSchoolReducer,
  getSelectedSchool: getSelectedSchoolReducer,
  getFilterOptions: getFilterOptionsReducer,
})

const store = createStore(reducers)

store.dispatch({
  type: 'SET_DATA',
  payload: [],
})

store.dispatch({
  type: 'SET_HOVER_DATA',
  payload: [],
})

store.dispatch({
  type: 'SET_BAR_DATA',
  payload: [],
})

store.dispatch({
  type: 'SET_MAP_DATA',
  payload: [],
})

store.dispatch({
  type: 'SET_PERSON_DATA',
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

store.dispatch({
  type: 'SET_FILTERING',
  payload: Filter(),
})

store.dispatch({
  type: 'SET_SELECTED_SCHOOL',
  payload: [],
})

store.dispatch({
  type: 'SET_SELECTED_ORGANISATION',
  payload: [],
})
export default store
