import store from '../reducers'
import * as d3 from 'd3'
import filterSchoolAndOrg from './FilterScoolAndOrg'

export default function Model(filterOptions) {
  //Get the data

  let data = filterSchoolAndOrg.getOrg()[0].values

  if (
    !filterOptions.barChart.filter &&
    !filterOptions.map.filter &&
    !filterOptions.personList.filter
  ) {
    store.dispatch({
      type: 'SET_DATA',
      payload: data,
    })
  }

  if (filterOptions.barChart.filter) {
    data = data.filter(emp => {
      return filterOptions.barChart.employees.includes(emp.employee)
    })
    store.dispatch({
      type: 'SET_MAP_DATA',
      payload: data,
    })
    store.dispatch({
      type: 'SET_PERSON_DATA',
      payload: data,
    })
  }

  if (filterOptions.map.filter) {
    data = data.filter(emp => {
      return filterOptions.map.chosenCountry == emp.arrival_country
    })
    store.dispatch({
      type: 'SET_BAR_DATA',
      payload: data,
    })
    store.dispatch({
      type: 'SET_PERSONLIST_DATA',
      payload: data,
    })
  }

  if (filterOptions.personList.filter) {
    data = data.filter(emp => {
      return filterOptions.personList.employees.includes(emp.employee)
    })
    store.dispatch({
      type: 'SET_BAR_DATA',
      payload: data,
    })
    store.dispatch({
      type: 'SET_MAP_DATA',
      payload: data,
    })
  }
}
