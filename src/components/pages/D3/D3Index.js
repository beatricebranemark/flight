import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import PersonList from './PersonList/PersonList'
import store from '../../../reducers'

const D3Index = () => {
  const [index, setIndex] = useState(0)
  const [data, setData] = useState(store.getState().getData.data)

  store.subscribe(() => {
    let dataSet = store.getState().getData.data
    setData(dataSet)
  })

  function handleClick() {
    setIndex(index + 1)
  }

  return (
    <div className='homepage'>
      <h1 className='homepage__heading'>Flight</h1>
      <button onClick={handleClick}>Test</button>
      <BarChart data={data} />
      <Map data={data} />
      <PersonList data={data} />
    </div>
  )
}

export default D3Index
