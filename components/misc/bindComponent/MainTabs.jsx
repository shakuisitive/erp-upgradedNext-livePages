import React from 'react'
import Tabs from '../../Ui/tabs/Tabs'
import { GoHome } from 'react-icons/go';
import MainGrid from '../bindComponent/MainGrid'

const MainTabs = ({mainTabs , onRefresh , exportProps , tabsmains }) => {

   
    
   
  return (
    <div>
      <Tabs
       tabs={mainTabs}
        exportProps={exportProps}
         onRefresh={onRefresh}
         
          />
    </div>
  )
}

export default MainTabs
