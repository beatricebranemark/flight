import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import store from '../../../reducers'
import NavBar from './NavBar/NavBar'
import {Provider} from 'react-redux'
import HoverBox from './HoverBox/hoverBox'
import SideChart from './SideChart/SideChart'

import Filter from './../../Filter'

import {useBooleanKnob} from 'retoggle'
import {
  Header,
  Icon,
  Image,
  Button,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import TopTen from './TopTen/TopTen'

const D3Index = props => {
  const [data, setData] = useState(store.getState().getSchools.data)
  const filter = Filter()
  store.subscribe(() => {
    setData(store.getState().getSchools.data)
  })


  return (
    <div className='homepage'>
      <div className='homepage__heading'>
        <h1 className='homepage__heading__title'>Flight</h1>
      </div>
      <Provider store={store}>
        <>
          <NavBar props={props} />
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='push'
              icon='labeled'
              inverted
              vertical
              visible
              width='wide'
            >
              <h1>heeej</h1>
              <SideChart filter={filter} ></SideChart>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <div id="secondViewBarChart">
                  <BarChart type={'secondView'} filter={filter}/>
                </div>
                <Map filter={filter} />
                <TopTen/>
                <HoverBox />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </>

      </Provider>
    </div>
  )
}

export default D3Index
