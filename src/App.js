import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import events from "./events";

const localizer = momentLocalizer(moment)

let formats = {
  agendaHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, 'DD/MM/YYYY', culture) + ' — ' +
    localizer.format(end, 'DD/MM/YYYY', culture),
}

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

const App = props => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div style={{
      width: '80%',
      height: '80%'
    }}>
      <Calendar
        events={events}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        localizer={localizer}
        style={{ height: '100%' }}
        defaultView='month'
        views={['month', 'week', 'day', 'agenda']}
        onSelectEvent={event => window.open(event.resource, '_blank').focus()}
        formats={formats}
      />
    </div>
  </div>
)

export default App;
