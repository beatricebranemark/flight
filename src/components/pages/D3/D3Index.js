import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import PersonList from './PersonList/PersonList'
import store from '../../../reducers'
import NavBar from './NavBar/NavBar'
import HomeScreen from './HomeScreen'
import {Provider} from 'react-redux'

import { useBooleanKnob } from 'retoggle'
import { Header, Icon, Image,Button, Menu, Segment, Sidebar } from 'semantic-ui-react'

const D3Index = () => {
  const [data, setData] = useState(store.getState().getData.data)

  store.subscribe(() => {
    setData(store.getState().getData.data)
  })

  function showSideBar() {
    console.log(visible)

    if (visible == false){
      
      setVisible(true)
    }
    else {setVisible(false)}
  }
  const [visible, setVisible] = useBooleanKnob({ name: 'visible' })
  return (
    <div className='homepage'>
      <div className='homepage__heading'>
        <h1 className='homepage__heading__title'>Flight</h1>
      </div>
        <Provider store={store}>
          <NavBar data={data} />
            {data.length == 0 ? (
          <HomeScreen />
              ) : (
          <div className='row'>
              <Button onClick={showSideBar}>Click Here</Button>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation='push'
                icon='labeled'
                inverted
                onHide={() => setVisible(true)}
                vertical
                visible={visible}
                width='wide'
              >
            <Menu.Item>
              <PersonList />
            </Menu.Item>
            </Sidebar>
      <Sidebar.Pusher>
        <Segment basic>
        <BarChart />
              <Map />  
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
        )}
      </Provider>
    </div>
  )
}

export default D3Index
