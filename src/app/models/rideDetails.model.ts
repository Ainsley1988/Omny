export interface rideDetails{
    cardid:number;
    time:Date
    route:string;
    location: { latitude: number; longitude: number }[],
    isFree:boolean
}