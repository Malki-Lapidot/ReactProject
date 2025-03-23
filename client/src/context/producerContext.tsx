import { createContext, useMemo, useState, useCallback } from "react";
import { producer } from "../types/producer";
import { useHttp } from "../custom-hooks/useHttp";

type producerContextType = {
  currentProducer: producer | null;
  setCurrentProducer: (producer:producer|null)=>any;
  getProducer: (email: string) => Promise<void>;
  addProducer :(newProducer:producer)=> Promise<void>;
  updateProducer: (email: string, newProducer: producer) => Promise<void>;
};

export const producerContext = createContext<Partial<producerContextType>>({});

export const ProducerProvider = (props: any) => {
  const [currentProducer, setCurrentProducer] = useState<producer | null>(null);
  const { request } = useHttp<producer>('/producer', 'get');

  const getProducer = useCallback(async (email:string): Promise<void> => {
    const result = await request(`/producer/${email}`,'get');
    if (result) {
      setCurrentProducer(result);
    }
  }, [request]);

  const addProducer = useCallback(async (newProducer:producer): Promise<void> => {
    await request(`/producer`,'post',newProducer);
  }, [request]);

  const updateProducer = useCallback(async (email: string, newProducer: producer): Promise<void> => {
    await request(`/producer/${email}`, 'put', newProducer);
    setCurrentProducer({ ...newProducer });
    if (newProducer.email) {
      await getProducer(newProducer.email);
    }
  }, [request,getProducer]);

  const contextValue = useMemo(() => ({
    currentProducer,
    setCurrentProducer,
    getProducer,
    addProducer,
    updateProducer
  }), [currentProducer, getProducer, updateProducer]);

  return (
    <producerContext.Provider value={contextValue}>
      {props.children}
    </producerContext.Provider>
  );
};