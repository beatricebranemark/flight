import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import PersonList from './PersonList/PersonList'
import store from '../../../reducers'
import NavBar from './NavBar/NavBar'
import HomeScreen from './HomeScreen'

const D3Index = () => {
  const [data, setData] = useState(store.getState().getData.data)

  store.subscribe(() => {
    let dataSet = store.getState().getData.data
    setData(dataSet)
  })

  return (
    <div className='homepage'>
          <div className="homepage__heading">
            <h1 className='homepage__heading__title'>Flight</h1>
          </div>
          
      <NavBar data={data} />
      {data.length == 0 ? <HomeScreen></HomeScreen> : []}
      {data.length > 0 ? <BarChart data={data} /> : []}
      <Map data={data} />
      {data.length > 0 ? <PersonList data={data} /> : []}
    </div>
  )
}

export default D3Index
