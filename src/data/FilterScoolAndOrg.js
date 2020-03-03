import Data from './data'
import store from '../reducers'
import Model from './model'
import getFilter from '../components/Filter'
import * as d3 from 'd3'

class FilterSchoolAndOrg {
  constructor() {
    this.organisation = []
    this.organisationsInSelectedSchool = []
    this.school = []
    this.data = []
    this.selectedSchool = ''
    this.selectedOrg = ''
    this.schools = []
  }

  setAllData() {
    this.data = Data()
    let filter = getFilter()
    //Group by school
    this.schools = d3
      .nest()
      .key(function(d) {
        return d.school
      })
      .entries(this.data)

    store.dispatch({
      type: 'SET_SCHOOLS',
      payload: this.schools,
    })
    Model(filter)
  }

  getAllData() {
    return this.data
  }

  setSchool(selectedSchool) {
    //Get the data
    this.data = Data()

    this.selectedSchool = selectedSchool

    //Filter out selected school
    this.school = this.schools.filter(school => {
      return school.key === this.selectedSchool
    })
    store.dispatch({
      type: 'SET_SELECTED_ORGANISATION',
      payload: [],
    })
    if (this.selectedSchool === 'kth') {
      store.dispatch({
        type: 'SET_SELECTED_SCHOOL',
        payload: this.data,
      })
    } else {
      store.dispatch({
        type: 'SET_SELECTED_SCHOOL',
        payload: this.school[0].values,
      })

      //Group by organisation in the selected school
      this.organisationsInSelectedSchool = d3
        .nest()
        .key(function(d) {
          return d.org_name
        })
        .entries(this.school[0].values)

      store.dispatch({
        type: 'SET_ORGANISATIONS',
        payload: this.organisationsInSelectedSchool,
      })
    }
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
    store.dispatch({
      type: 'SET_SELECTED_ORGANISATION',
      payload: this.organisation,
    })
    let filter = getFilter()
    Model(filter)
  }

  getOrg() {
    return this.organisation
  }
}

let filterSchoolAndOrg = new FilterSchoolAndOrg()
export default filterSchoolAndOrg
