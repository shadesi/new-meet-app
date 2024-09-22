import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
  let EventListComponent;
  
  beforeEach(() => {
    // Initial rendering of EventList without any props
    EventListComponent = render(<EventList events={[]} />);
  });

  test('has an element with "list" role', () => {
    // Check if the event list is rendered with role="list"
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    // Fetch events from the API mock
    const allEvents = await getEvents();

    // Re-render EventList with fetched events
    EventListComponent.rerender(<EventList events={allEvents} />);

    // Ensure that the correct number of events is rendered (one list item per event)
    expect(EventListComponent.getAllByRole('listitem')).toHaveLength(allEvents.length);
  });
});
