import React, {useState, useEffect} from 'react'
import store from '../../../../reducers'
import FilterScoolAndOrg from '../../../../data/FilterScoolAndOrg'

const NavBar = props => {
  const [orgs, setOrgs] = useState(store.getState().getOrgs.data)
  const [schools, setSchools] = useState(
    store.getState().getSchools.data.map(schools => schools)
  )
  const [currentSchool, setCurrentSchool] = useState(
    store.getState().getSelectedSchool.data[0].key
  )
  const [currentOrg, setCurrentOrg] = useState(
    store.getState().getSelectedOrg.data[0].key
  )

  let organisationsList = React.createRef()
  let schoolsList = React.createRef()

  store.subscribe(() => {
    setOrgs(store.getState().getOrgs.data)
    //setSchools(store.getState().getSchools.data)
  })
  const schoolTags = schools.map(school => {
    return (
      <option key={school.key} value={school.key}>
        {school.key}
      </option>
    )
  })

  const orgTags = orgs.map(org => {
    return (
      <option key={org.key} value={org.key}>
        {org.key}
      </option>
    )
  })

  function handleSelectedSchool(e) {
    setCurrentSchool(e.target.value)
    setCurrentOrg('')
    FilterScoolAndOrg.setSchool(e.target.value)
  }

  function handleSelectedOrg(e) {
    setCurrentOrg(e.target.value)
    FilterScoolAndOrg.setOrg(e.target.value)
  }

  return (
    <div className='NavBar'>
      <select
        className='browser-default custom-select'
        id='schools'
        onChange={handleSelectedSchool}
        ref={schoolsList}
        defaultValue={currentSchool}
      >
        <option key='Select a school' disabled={true} value={''}>
          Select a school
        </option>
        {schoolTags}
      </select>

      <select
        className='browser-default custom-select'
        id='organisations'
        onChange={handleSelectedOrg}
        ref={organisationsList}
        defaultValue={currentOrg}
      >
        <option
          key='Select an organisation'
          disabled={true}
          value={''}
        >
          Select an organisation
        </option>
        {orgTags}
      </select>
    </div>
  )
}

export default NavBar
