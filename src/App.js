import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './App.css';
import logo from './logo.svg';
import Papa from 'papaparse';

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
});

function App() {
  const [data, setData] = useState([]);
  const [locations, setLocation] = useState([]);

  useEffect(() => {
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vR69L6X2MEag5khuuB4TGDXtlpbJNPjP-CDCffxyZlyXtWKmDok_d1uZmnXJoKKcj1BmNQMu_JIOW97/pub?output=csv', {
      download: true,
      header: true,
      complete: (data) => {
        var events = [];
        var locations = [];
        for(var i = 0; i < data.data.length; i++) {

          const startDate = data.data[i].startDate.split('/');
          const startTime = data.data[i].startTime.split(':')
          var startDateTime = new Date(startDate[2], startDate[1]-1, startDate[0], startTime[0], startTime[1])

          var endDate = data.data[i].endDate.split('/');
          var endTime = data.data[i].endTime.split(':')
          var endDateTime = new Date(endDate[2], endDate[1]-1, endDate[0], endTime[0], endTime[1])

          const allDay = (data.data[i].allDay.toLowerCase() === 'true');

          const resource = {
            url: data.data[i].url,
            location: data.data[i].location
          }

          events.push(
            {
              id: i,
              title: data.data[i].title,
              allDay: allDay,
              start: startDateTime,
              end: endDateTime,
              resource: resource,
            }
          );
          if(!locations.includes(resource.location))
          {
            locations.push(resource.location);
          }
        }
        setData(events);
        setLocation(locations);
      }
    })
  }, []);

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <img className="logo" src={logo} alt="Homeinstead" />
          <div className="filterArea">
            <label for="location">Location</label>
            <select id="location" name="location" className="location">
              {locations.map(loc =>{
                return <option value={loc}>{loc}</option>
              })}
            </select>
          </div>
        </div>
        <Calendar
          events={data}
          components={{
            eventWrapper: ColoredDateCellWrapper
          }}
          localizer={localizer}
          style={{ 
            height: '85%',
          }}
          defaultView='month'
          views={['month', 'week', 'day', 'agenda']}
          onSelectEvent={event => window.open(event.resource.url, '_blank').focus()}
          formats={formats}
        />
      </div>
    </div>
  )
}

export default App;
