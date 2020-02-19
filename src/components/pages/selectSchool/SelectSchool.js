import React, {useState, useRef, useEffect} from 'react'
import store from './../../../reducers/'
import FilterScoolAndOrg from '../../../data/FilterScoolAndOrg'

const SelectSchool = () => {
  const [schools, setSchools] = useState(
    store.getState().getSchools.data
  )

  let schoolsList = React.createRef()

  store.subscribe(() => {
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
  })
  return (
    <div className='selectSchoolpage'>
      <select id='schools' ref={schoolsList}></select>
    </div>
  )
}

export default SelectSchool
