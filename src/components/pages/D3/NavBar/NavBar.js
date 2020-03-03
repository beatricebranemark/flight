import React, {useState, useEffect} from 'react'
import store from '../../../../reducers'
import FilterScoolAndOrg from '../../../../data/FilterScoolAndOrg'

const NavBar = props => {
  console.log(props)
  const [orgs, setOrgs] = useState(store.getState().getOrgs.data)
  const [schools, setSchools] = useState(
    store.getState().getSchools.data.map(schools => schools)
  )
  const [currentSchool, setCurrentSchool] = useState(
    store.getState().getSelectedSchool.data
  )
  const [currentOrg, setCurrentOrg] = useState(
    store.getState().getSelectedOrg.data
  )

  let organisationsList = React.createRef()
  let schoolsList = React.createRef()

  store.subscribe(() => {
    setOrgs(store.getState().getOrgs.data)
    //setSchools(store.getState().getSchools.data)
  })
  const schoolTags = schools.map(school => {
    return (
      <option
        key={school.key}
        selected={
          currentSchool[0].school === school.key ? true : false
        }
        value={school.key}
      >
        {school.key}
      </option>
    )
  })

  const orgTags = orgs.map(org => {
    return (
      <option
        key={org.key}
        selected={currentOrg[0].key === org.key ? true : false}
        value={org.key}
      >
        {org.key}
      </option>
    )
  })

  function handleSelectedSchool(e) {
    setCurrentSchool(e.target.value)
    setCurrentOrg([{key: ''}])
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
      >
        <option key='Select a school' disabled='true' value=''>
          Select a school
        </option>
        {schoolTags}
      </select>

      <select
        className='browser-default custom-select'
        id='organisations'
        onChange={handleSelectedOrg}
        ref={organisationsList}
      >
        <option
          key='Select an organisation'
          selected={currentOrg[0].key === '' ? true : false}
          disabled={true}
          value=''
        >
          Select an organisation
        </option>
        {orgs.length > 0 ? orgTags : null}
      </select>
      <button
        className='btn btn-success'
        id='schoolButton'
        onClick={() => props.props.history.push('/')}
      >
        Go Back
      </button>
    </div>
  )
}

export default NavBar
