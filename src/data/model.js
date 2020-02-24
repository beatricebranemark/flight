import store from '../reducers'
import * as d3 from 'd3'
import filterSchoolAndOrg from './FilterScoolAndOrg'

export default function Model({}) {
  //Get the data
  let data = filterSchoolAndOrg.getOrg()
  store.dispatch({
    type: 'SET_DATA',
    payload: data,
  })
}
