import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { event } from "../types/event";
import { useHttp } from "../custom-hooks/useHttp";

type eventContextType = {
    events:event[]| null;
    getEvent: () => Promise<void>;
    getEventByID: (eventID: string) => Promise<event | undefined>;
    addEvent: (newEvent: event) => Promise<event|undefined>;
    updateEvent: (eventID: string, newEvent: event) => Promise<event|undefined>;
    deleteEvent: (eventID: string) => Promise<void>;
};

export const eventContext = createContext<Partial<eventContextType>>({});

export const EventProvider = (props: any) => {
    const [events, setEvents] = useState<event[]>([]);
    const { request } = useHttp<event>('/event', 'get');

    const getEvent = useCallback(async (): Promise<void> => {
        const result = await request("/event", "get");
        if (result)
            setEvents(Array.isArray(result) ? result : [result]);
    }, [request])

    const getEventByID = useCallback(async (eventID: string): Promise<event | undefined> => {
        return await request(`/event/${eventID}`, 'get');
    }, [request]);

    const addEvent = useCallback(async (newEvent: event): Promise<event|undefined> => {
        const result=await request("/event","post",newEvent)
        if(result){
            getEvent();
        }
        return(result);
    },[request])

    const updateEvent = useCallback(async (eventID: string, newEvent: event): Promise<event|undefined> => {  
        console.log("the update producer ", newEvent)
        const result=await request(`/event/${eventID}`, 'put', newEvent);
        await getEvent();
        return result;
    }, [request]);

    const deleteEvent = useCallback(async (eventID: string): Promise<void> => {
        const result=await request(`/event/${eventID}`,"delete")
        if(result){
            getEvent();
        }
    },[request])



    const contextValue = useMemo(() => ({
        events,
        getEvent,
        getEventByID,
        addEvent,
        updateEvent,
        deleteEvent
    }), [events, getEvent]);

      useEffect(() => {
        getEvent();
      }, []);

    return (
        <eventContext.Provider value={contextValue}>
            {props.children}
        </eventContext.Provider>
    );
};