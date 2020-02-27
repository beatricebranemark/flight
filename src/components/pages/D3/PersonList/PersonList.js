import React, {useEffect, useRef} from 'react'
import Model from '../../../../data/model'
import './index.css'
import {connect} from 'react-redux'
import * as d3 from 'd3'

const PersonList = ({data, filter}) => {
  // Data
  let organisation_trips = data

  //Lista med employees
  const employee_list = []
  const na_list = []

  organisation_trips.forEach(d => {
    if (d.employee != '#N/A') {
      if (employee_list.includes(d.employee) === false) {
        employee_list.push(d.employee)
      }
    } else {
      na_list.push(d.employee)
    }
  })

  //Click function, chosen employee är från början hela employee list
  const chosen_employees_list = []

  function chosenEmployee(evt, id) {
    //=inactive by default

    if (evt.target.className == 'person_inactive') {
      console.log(evt.target.className)
      evt.target.className = 'person_active'
      if (chosen_employees_list.includes(id) === false) {
        //om personen inte finns i listan, lägg till
        chosen_employees_list.push(id)
      }
    } else {
      console.log(evt.target.className)
      evt.target.className = 'person_inactive'
      if (chosen_employees_list.includes(id) === true) {
        //om personen finns i listan, ta bort
        const index = chosen_employees_list.indexOf(id)
        chosen_employees_list.splice(index, 1)
      }
    }
    //send list to model here
    filter.personList.filter = true
    filter.personList.employees = chosen_employees_list
    Model(filter)
  }

  return (
    <div className='personlist'>
      {employee_list.map(emp => (
        <li
          key={emp}
          className='person_inactive'
          onClick={e => chosenEmployee(e, emp)}
        >
          Employee: {emp}
        </li>
      ))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  let newData =
    state.getPerson.data.length == 0 ? state.getData : state.getPerson
  return {
    data: newData.data,
    filter: ownProps.filter,
  }
}

/*const mapDispatchToProps = dispatch => {
  return {
    setMapData: () =>
      dispatch({
        type: 'SET_MAP_DATA',
      }),
  }
}*/

export default connect(mapStateToProps)(PersonList)
