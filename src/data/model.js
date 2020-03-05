import store from '../reducers'
import * as d3 from 'd3'
import filterSchoolAndOrg from './FilterScoolAndOrg'

export default function Model(filterOptions) {
  //Get the data

  let data =
    filterSchoolAndOrg.getOrg().length > 0
      ? filterSchoolAndOrg.getOrg()[0].values
      : filterSchoolAndOrg.getAllData()

  if (
    !filterOptions.barChart.filter &&
    !filterOptions.map.filter &&
    !filterOptions.personList.filter
  ) {
    store.dispatch({
      type: 'SET_DATA',
      payload: data,
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
      type: 'SET_BAR_DATA',
      payload: [],
    })
  }

  if (filterOptions.barChart.filter) {
    store.dispatch({
      type: 'SET_MAP_DATA',
      payload: [],
    })
    store.dispatch({
      type: 'SET_MAP_DATA',
      payload: filterOptions.barChart.employees,
    })
    store.dispatch({
      type: 'SET_PERSON_DATA',
      payload: [],
    })
    store.dispatch({
      type: 'SET_PERSON_DATA',
      payload: filterOptions.barChart.employees,
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
    store.dispatch({
      type: 'SET_BAR_DATA',
      payload: [],
    })
    store.dispatch({
      type: 'SET_BAR_DATA',
      payload: filterOptions.personList.employees,
    })
    store.dispatch({
      type: 'SET_MAP_DATA',
      payload: [],
    })
    store.dispatch({
      type: 'SET_MAP_DATA',
      payload: filterOptions.personList.employees,
    })
  }
}
