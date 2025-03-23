export type producer={
    name:string,
    email:string,
    phone:string,
    details:string,
    events: { eventID: string; eventName: string; }[]
};