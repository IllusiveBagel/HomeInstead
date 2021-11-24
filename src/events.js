const now = new Date()

const events = [
    {
        id: 0,
        title: 'All Day Event Very Long Title',
        allDay: true,
        start: now,
        end: now,
        resource: 'https://www.google.co.uk/'
    },
    {
        id: 1,
        title: 'Another all day event',
        allDay: true,
        start: new Date(2021, 11, 31),
        end: new Date(2021, 11, 31),
        resource: 'https://www.google.co.uk/'
    },
    {
        id: 2,
        title: 'Event 3',
        allDay: true,
        start: new Date(2021, 10, 23),
        end: new Date(2021, 10, 23),
        resource: 'https://www.google.co.uk/'
    },
    {
        id: 3,
        title: 'Event 4',
        allDay: true,
        start: new Date(2021, 10, 23),
        end: new Date(2021, 10, 23),
        resource: 'https://www.google.co.uk/'
    }
];

export default events;