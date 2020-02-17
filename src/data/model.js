import Data from '../data/data'
import store from '../reducers'
import * as d3 from 'd3'

export default function Model(filter) {
  let selectedSchool = 'ECS'
  let selectedOrg = 'TEORETISK DATOLOGI'

  //Get the data
  let data = Data()

  //Group by school
  data = d3
    .nest()
    .key(function(d) {
      return d.school
    })
    .entries(data)

  //Filter out selected school
  data = data.filter(school => {
    return school.key === selectedSchool
  })

  //Group by organisation in the selected school
  data = d3
    .nest()
    .key(function(d) {
      return d.org_name
    })
    .entries(data[0].values)

  //Filter out selected organisation
  data = data.filter(org => {
    return org.key === selectedOrg
  })

  store.dispatch({
    type: 'SET_DATA',
    payload: data,
  })
}
