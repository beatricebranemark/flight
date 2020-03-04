import React, {useState, useEffect} from 'react'
import store from '../../../reducers'
import FilterScoolAndOrg from '../../../data/FilterScoolAndOrg'
import BarChart from './BarChart/BarChart'
import {Provider} from 'react-redux'
import Filter from './../../Filter'
import TopMenu from '../TopMenu/TopMenu'
const HomeScreen = props => {
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

  const [orgSelected, setSelectOrg] = useState(false)

  let filter = Filter()
  let organisationsList = React.createRef()
  let schoolsList = React.createRef()

  store.subscribe(() => {
    setOrgs(store.getState().getOrgs.data)
    //setSchools(store.getState().getSchools.data)
  })

  const schoolsButton = schools.map(school => {
    return (
      <button
        key={school.key}
        value={school.key}
        className='btn btn-dark'
        id='schoolButton'
        onClick={handleSelectedSchool}
      >
        {school.key}
      </button>
    )
  })
  const orgTags = orgs.map(org => {
    return (
      <option
        key={org.key}
        value={org.key}
        selected={
          currentOrg.length > 0
            ? currentOrg[0].key === org.key
              ? true
              : false
            : null
        }
      >
        {org.key}
      </option>
    )
  })

  function handleSelectedSchool(e) {
    setCurrentSchool(e.target.value)
    FilterScoolAndOrg.setSchool(e.target.value)
  }

  function handleSelectedOrg(e) {
    setCurrentOrg(e.target.value)
    setSelectOrg(true)
    FilterScoolAndOrg.setOrg(e.target.value)
  }
  return (
    <React.Fragment>
  <TopMenu props={props}></TopMenu>
    <div className='NavBar'>
      <Provider store={store}>
        <BarChart filter={filter} type={'firstView'} />
      </Provider>
      <div id='selectSchoolOrg'>
        <h2>Select your school: {currentSchool}</h2>
        <div
          className='buttonContainer'
          onChange={handleSelectedSchool}
          ref={schoolsList}
        >
          <button
            key='kth'
            value='kth'
            className='btn btn-dark'
            id='schoolButton'
            onClick={handleSelectedSchool}
          >
            All Schools
          </button>
          {schoolsButton}
        </div>
        {currentSchool.length === 0 ||
        currentSchool === 'kth' ? null : (
          <div>
            <h2>Select your org</h2>
            <select
              className='browser-default custom-select'
              id='organisations'
              onChange={handleSelectedOrg}
              ref={organisationsList}
            >
              <option
                key='Select an organisation'
                selected={true}
                disabled={true}
                value=''
              >
                Select an organisation
              </option>
              {orgs.length > 0 ? orgTags : null}
            </select>
          </div>
        )}
        {!orgSelected ? null : (
          <button
            className='btn btn-success'
            id='schoolButton'
            onClick={() => props.history.push('/seeOrg')}
          >
            See Details
          </button>
        )}
      </div>
    </div>
    </React.Fragment>
  )
}

export default HomeScreen
