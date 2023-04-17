import React from 'react';
import './TripDescription.scss';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, useTab, useMultiStyleConfig } from '@chakra-ui/react'
import Plan from './Plan';
import calendar from '../../../assets/calendar.svg';
import todos from '../../../assets/todos.svg';
import wallet from '../../../assets/wallet.svg';
import { useSelector } from 'react-redux';
import { selectTripById } from '../../../features/trips/tripsSlice';
import { RootState } from '../../../store/store';
import arrow from '../../../assets/arrow.svg';
import { Link } from 'react-router-dom';


const TripDescription = (props: any) => {
    const trip = useSelector((state: RootState) => selectTripById(state, props.tripId))

    return (
        <div className='trip-description-container' >
            <header>
                <h1><Link to="/main"><img src={arrow} alt='arrow'/></Link>{trip?.title}</h1>
            </header>
            <div id='trip-description-content'>
                <Tabs className='tabs' variant='unstyled'>
                    <TabList className='tablist'>
                        <Tab className='singletab'><img src={calendar}/>Plan</Tab>
                        <Tab className='singletab'><img src={todos}/>ToDos</Tab>
                        <Tab className='singletab'><img src={wallet}/>Expenses</Tab>
                    </TabList>

                    <TabPanels className='tabpanels'>
                        <TabPanel className='panel'>
                        <Plan tripId = {props.tripId}/>
                        </TabPanel>
                        <TabPanel className='panel'>
                        <p>two!</p>
                        </TabPanel>
                        <TabPanel className='panel'>
                        <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div> 
        </div>
    )
}

export default TripDescription