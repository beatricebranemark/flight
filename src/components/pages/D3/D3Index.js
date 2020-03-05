import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import store from '../../../reducers'
import NavBar from './NavBar/NavBar'
import {Provider} from 'react-redux'
import HoverBox from './HoverBox/hoverBox'
import SideChart from './SideChart/SideChart'
import TopMenu from '../TopMenu/TopMenu'
import Filter from './../../Filter'
import PieChart from './PieChart/PieChart'
import { withRouter } from "react-router-dom";
import './D3Index.css';

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
const [visible, setVisible] = useBooleanKnob({ name: 'visible' })
let showSideBar = () => {
  console.log(visible)
  if (visible === false) {
    setVisible(true)
  }
  else{
    setVisible(false)
  }

}

  return (
    <React.Fragment>
    <TopMenu props={props}></TopMenu>
     
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
              visible={visible}
              width='wide'
            >
              <h1>Employee Data</h1>

              <SideChart filter={filter} ></SideChart>
            </Sidebar>
            <Sidebar.Pusher id="sideBarChart">
              <span onClick={showSideBar} className="badge badge-success" id="showButton"><i class="fas fa-angle-right"></i></span>         
              <Segment basic>
                <div id="secondViewBarChart">
                  <BarChart type={'secondView'} filter={filter}/>
                </div>
                <Map filter={filter} />
                <HoverBox />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </>
        <div><PieChart/></div>

      </Provider>
 
      </React.Fragment>
  )
}

export default withRouter(D3Index)
