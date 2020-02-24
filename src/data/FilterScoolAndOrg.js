import Data from './data'
import store from '../reducers'
import Model from './model'
import * as d3 from 'd3'

class FilterSchoolAndOrg {
  constructor() {
    this.organisation = []
    this.organisationsInSelectedSchool = []
    this.school = []
    this.data = []
    this.selectedSchool = ''
    this.selectedOrg = ''
  }

  setSchool(selectedSchool) {
    //Get the data
    this.data = Data()

    this.selectedSchool = selectedSchool

    //Group by school
    let schools = d3
      .nest()
      .key(function(d) {
        return d.school
      })
      .entries(this.data)

    //Filter out selected school
    this.school = schools.filter(school => {
      return school.key === this.selectedSchool
    })

    //Group by organisation in the selected school
    this.organisationsInSelectedSchool = d3
      .nest()
      .key(function(d) {
        return d.org_name
      })
      .entries(this.school[0].values)

    store.dispatch({
      type: 'SET_SCHOOLS',
      payload: schools,
    })

    store.dispatch({
      type: 'SET_ORGANISATIONS',
      payload: this.organisationsInSelectedSchool,
    })
  }

  getSchool() {
    return this.school
  }

  setOrg(selectedOrg) {
    this.selectedOrg = selectedOrg
    //Filter out selected organisation

    this.organisation = this.organisationsInSelectedSchool.filter(
      org => {
        return org.key === this.selectedOrg
      }
    )
    Model({})
  }

  getOrg() {
    return this.organisation
  }
}

let filterSchoolAndOrg = new FilterSchoolAndOrg()
export default filterSchoolAndOrg
