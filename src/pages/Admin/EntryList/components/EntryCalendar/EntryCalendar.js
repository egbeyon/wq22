import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

class EntryCalendar extends Component {
  onFindAttr = (id, list, attr) => {
    const item = list.find(item => item._id === id);
    return item ? item[attr] : `Not ${attr} Found`;
  };

  render() {
    const { allTeams, entry } = this.props;

    const events = entry.map(data => ({
      title: `Team: ${this.onFindAttr(
        data.teamId,
        allTeams,
        'name'
      )}-Team: ${this.onFindAttr(data.teamId, allTeams, 'name')}`,
      start: entry.createdAt,
      // startTime: data.startAt,
      // end: data.date,
      //url: `/movie/${data.movieId}`
    }));

    return (
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
      />
    );
  }
}

export default EntryCalendar;
