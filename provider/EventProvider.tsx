import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { useMapContext } from './MapProvider';

export type Event = {
  id: number;
  title: string;
  desc: string;
  location: {
    coordinates: number[];
    type: 'Point';
  };
  coverUri: string;
  photos: string[];
  followers: string[];
  endAt: Date;
  beginAt?: Date;
  distance: number;
  price: number;
  userId: string[];
  place: string;
  type: string[];
};

interface EventProvider {
  setEvents: Dispatch<Event[]>;
  events: Event[];
  setIsOpenAddEventModal: Dispatch<boolean>;
  isOpenAddEventModal: boolean;
}

export const EventContext = createContext({} as EventProvider);
export const EventProvider: FC = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isOpenAddEventModal, setIsOpenAddEventModal] =
    useState<boolean>(false);
  const { location } = useMapContext();

  // useEffect(() => {
  //   (async () => {
  //     if (location) {
  //       try {
  //         const eventsFromServer = await axios.get(
  //           'http://192.168.1.33:3000/event/near',
  //           {
  //             params: {
  //               distance: RADIUS_BASE_IN_METRE * 10000,
  //               long: location.longitude,
  //               lat: location.latitude,
  //             },
  //           },
  //         );

  //         if (eventsFromServer) {
  //           setEvents(eventsFromServer.data);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   })();
  // }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        isOpenAddEventModal,
        setIsOpenAddEventModal,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventsContext = () => useContext(EventContext);
