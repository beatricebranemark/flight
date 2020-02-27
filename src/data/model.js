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
    let filteredData = data.filter(emp => {
      return filterOptions.barChart.employees.includes(emp.employee)
    })
    store.dispatch({
      type: 'SET_MAP_DATA',
      payload: filteredData,
    })
    store.dispatch({
      type: 'SET_PERSON_DATA',
      payload: filteredData,
    })
  }

  if (filterOptions.map.filter) {
    let filteredData = data.filter(emp => {
      return filterOptions.map.chosenCountry == emp.arrival_country
    })
    store.dispatch({
      type: 'SET_BAR_DATA',
      payload: filteredData,
    })
    store.dispatch({
      type: 'SET_PERSON_DATA',
      payload: filteredData,
    })
  }

  if (filterOptions.personList.filter) {
    let filteredData = data.filter(emp => {
      return filterOptions.personList.employees.includes(emp.employee)
    })
    store.dispatch({
      type: 'SET_BAR_DATA',
      payload: filteredData,
    })
    store.dispatch({
      type: 'SET_MAP_DATA',
      payload: filteredData,
    })
  }
}
