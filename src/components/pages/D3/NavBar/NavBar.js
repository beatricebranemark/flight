import React, {useState, useRef, useEffect} from 'react'
import store from '../../../../reducers'
import FilterScoolAndOrg from '../../../../data/FilterScoolAndOrg'

const NavBar = () => {
  const [orgs, setOrgs] = useState(store.getState().getOrgs.data)
  const [schools, setSchools] = useState(
    store.getState().getSchools.data
  )

  let organisationsList = React.createRef()
  let schoolsList = React.createRef()

  store.subscribe(() => {
    setOrgs(store.getState().getOrgs.data)
    setSchools(store.getState().getSchools.data)
  })

  useEffect(() => {
    let schoolNode = schoolsList.current.children
    if (schoolNode.length < 1) {
      schools.map(school => {
        let optionTag = document.createElement('option')
        optionTag.setAttribute('value', school.key)
        optionTag.innerHTML = school.key
        schoolsList.current.appendChild(optionTag)
      })
    }
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
  })

  function renderOrganisations() {}

  function handleSelectedSchool(e) {
    FilterScoolAndOrg.setSchool(e.target.value)
    renderOrganisations()
  }

  function handleSelectedOrg(e) {
    FilterScoolAndOrg.setOrg(e.target.value)
  }
  function submitGroup(){

  }

  return (
    <div className='NavBar'>
            <select

              className="browser-default custom-select"
              
              id='schools'
              onChange={handleSelectedSchool}
              ref={schoolsList}
            ></select>
          
            <select
              className="browser-default custom-select"
              id='organisations'
              onChange={handleSelectedOrg}
              ref={organisationsList}
            >
            </select>

      </div>
     
  )
}

export default NavBar
