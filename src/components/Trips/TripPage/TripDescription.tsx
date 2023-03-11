import './TripDescription.scss';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Plan from './Plan';
import calendar from '../../../assets/calendar.svg';
import todos from '../../../assets/todos.svg';
import wallet from '../../../assets/wallet.svg';


const TripDescription = (props: any) => {
    return (
        <div className='trip-description-container' >
            <header>
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