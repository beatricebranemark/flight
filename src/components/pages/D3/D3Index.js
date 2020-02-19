import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import PersonList from './PersonList/PersonList'
import store from '../../../reducers'
import NavBar from './NavBar/NavBar'

const D3Index = () => {
  const [data, setData] = useState(store.getState().getData.data)

  store.subscribe(() => {
    let dataSet = store.getState().getData.data
    setData(dataSet)
  })

  return (
    <div className='homepage'>
      <h1 className='homepage__heading'>Flight</h1>
      <NavBar data={data} />
      <main className="homepage__main">
        {data.length > 0 ? <BarChart data={data} /> : []}
        <Map data={data} />
        {data.length > 0 ? <PersonList data={data} /> : []}
      </main>
    </div>
  )
}

export default D3Index
