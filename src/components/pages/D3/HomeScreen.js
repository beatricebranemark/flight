import React, {useState, useEffect} from 'react'
import store from '../../../reducers'
import FilterScoolAndOrg from '../../../data/FilterScoolAndOrg'
import BarChart from './BarChart/BarChart'


const HomeScreen = () => {
  const [orgs, setOrgs] = useState([])
  const [schools, setSchools] = useState(
    store.getState().getSchools.data.map(schools => schools)
  )
  const [currentSchool, setCurrentSchool] = useState('')

  let organisationsList = React.createRef()
  let schoolsList = React.createRef()

  store.subscribe(() => {
    setOrgs(store.getState().getOrgs.data)
    //setSchools(store.getState().getSchools.data)
  })

  useEffect(() => {
    let schoolNode = schoolsList.current.children
    if (schoolNode.length < 1) {
      schools.map(school => {
        let optionTag = document.createElement('button')
        optionTag.setAttribute('value', school.key)
        optionTag.setAttribute('class', 'btn btn-dark')
        optionTag.setAttribute('id', 'schoolButton')
        optionTag.setAttribute('onclick', function (d){handleSelectedSchool(d)})
        optionTag.innerHTML = school.key
        schoolsList.current.appendChild(optionTag)
      })
    }

    if (currentSchool == '') {
      let orgNode = organisationsList.current
      while (orgNode.firstChild) {
        orgNode.removeChild(orgNode.lastChild)
      }
      orgs.map(org => {
        let optionTag = document.createElement('option')
        optionTag.setAttribute('value', org.key)
        optionTag.innerHTML = org.key
        organisationsList.current.appendChild(optionTag)
      })
    }
  })


  function renderOrganisations() {}

  function handleSelectedSchool(e) {
    setCurrentSchool('')
    alert("hej")
    FilterScoolAndOrg.setSchool(e.target.value)
    renderOrganisations()
  }

  function handleSelectedOrg(e) {
    setCurrentSchool('org')
    FilterScoolAndOrg.setOrg(e.target.value)
  }
  function submitGroup() {}

  return (
    <div className='NavBar'>
      <BarChart></BarChart>
      <div id="selectSchoolOrg">
        <h2>Select your school</h2>
        <div
          className='buttonContainer'
          id='schools'
          onChange={handleSelectedSchool}
          ref={schoolsList}
        ></div>
        <h2>Select your org</h2>
        <select
          className='browser-default custom-select'
          id='organisations'
          onChange={handleSelectedOrg}
          ref={organisationsList}
        ></select>
        </div>
    </div>
  )
}

export default HomeScreen
