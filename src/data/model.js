import store from '../reducers'
import * as d3 from 'd3'
import filterSchoolAndOrg from './FilterScoolAndOrg'

export default function Model(filterOptions) {
  //Get the data
  let data = filterSchoolAndOrg.getOrg()
  if (filterOptions.barChart.filter) {
  }
  if (filterOptions.map.filter) {
  }
  if (filterOptions.personList.filter) {
  }

  store.dispatch({
    type: 'SET_DATA',
    payload: data,
  })
}
