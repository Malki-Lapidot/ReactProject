import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProducerMenu } from './components/producerMenu.tsx'
import { AddProducer } from './components/addProducer.tsx'
import { ProducerProvider } from './context/producerContext.tsx'
import { ProducerDetails } from './components/producerDetails.tsx'
import { EventDetailsForProducer } from './components/eventDetailsForProducer.tsx'
import { EventProvider } from './context/eventContext.tsx'
import { AddEvent } from './components/addEvent.tsx'
import { EventDetailsForUser } from './components/eventDetailsForUser.tsx'
import { Menu } from './components/menu.tsx'
import { EventListWithFilter } from './components/eventListWithFilter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>  
    <Menu/>
    <ProducerProvider>   
      <ProducerMenu /> 
      <EventProvider> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/addProducer" element={<AddProducer />} />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/producerDetails/:emailFromNewProducer?" element={<ProducerDetails/>} />
        <Route path="/eventDetailsForProducer/:eventID" element={<EventDetailsForProducer/>} />
        <Route path="/eventDetailsForUser" element={<EventDetailsForUser events={[]}/>} />
        <Route path="/eventListWithFilter" element={<EventListWithFilter />} />
      </Routes>  
      </EventProvider>  
     </ProducerProvider>       
    </BrowserRouter>   
  </StrictMode>,
)

