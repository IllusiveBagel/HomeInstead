import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import events from "./events";
import './App.css';
import logo from './logo.svg';

const localizer = momentLocalizer(moment)

let formats = {
  agendaHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, 'DD/MM/YYYY', culture) + ' — ' +
    localizer.format(end, 'DD/MM/YYYY', culture),
}

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: '#742059',
    },
  })

const App = () => (
  <div className="root">
    <div className="container">
      <div className="header">
        <img className="logo" src={logo} alt="Homeinstead" />
      </div>
      <Calendar
        events={events}
        components={{
          eventWrapper: ColoredDateCellWrapper
        }}
        localizer={localizer}
        style={{ 
          height: '85%',
        }}
        defaultView='month'
        views={['month', 'week', 'day', 'agenda']}
        onSelectEvent={event => window.open(event.resource, '_blank').focus()}
        formats={formats}
      />
    </div>
  </div>
)

export default App;
