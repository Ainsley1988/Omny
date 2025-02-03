import { BaseCard } from "./baseCard.model";
import { Travel } from "./travel.model";
import { rideDetails } from "./rideDetails.model";

export class rideTracker{
    private static instance:rideTracker;
    private allRide:rideDetails[]=[];
    private ride:Travel | null=null;
    private card:BaseCard | null=null;
    private taps:number = 0;
    private freeRideThreshold:number= 10;
    private cardTaps:{[cardid:string]:number}={};


constructor(){

    this.allRide =[];

}

public static getInstance():rideTracker{
    if(!rideTracker.instance){
        rideTracker.instance = new rideTracker();

    }
    return rideTracker.instance;
}
//log the rides
public logRide(card:BaseCard,route:string,location: { latitude: number; longitude: number }[],free:boolean):void{
    
    const rideDetails:rideDetails={
        cardid:card.getCardId(),
        time:new Date(),
        route:route,
        location:location,
        isFree:free
    }
const cardKey = card.getCardId().toString();
    if(!(cardKey in this.cardTaps)){

        this.cardTaps[cardKey]=0;


    }
    
this.cardTaps[cardKey]++;


this.allRide.push(rideDetails);

   
    
}

public getTapCountByCardId(cardId:number):number{
    const cardKey = cardId.toString();
    if(!(cardKey in this.cardTaps)){
        this.cardTaps[cardKey] =0;

    }
    
    
   
    
    return this.cardTaps[cardKey] ;
}

public getTapDifference(cardId:number):number{
    const cardKey = cardId.toString();
   // Initialize the card tap count to 0 if it doesn't exist
   if (!(cardKey in this.cardTaps)) {
    this.cardTaps[cardKey] = 0;
}

// If the tap count is zero, return the free ride threshold as the remaining taps
if (this.cardTaps[cardKey] === 0) {
    return this.freeRideThreshold;
}
// Calculate and return the difference between free ride threshold and taps used
const remainingTaps = this.freeRideThreshold - this.getTapCountByCardId(cardId);
console.warn("Card key:", cardKey, "Remaining taps for free ride:", remainingTaps);
return remainingTaps;
}
public checkFreeRideEligible():boolean{

    return this.taps>= this.freeRideThreshold;

}
//get the ride history
public getRideHistory():rideDetails[]{
    return this.allRide;
}
//get cards based on card id
public getRideByCardid(cardid:number):rideDetails[]{
    const rideForCard=[];
    const rideTrackerInstance = rideTracker.getInstance();

    for(let i=0;i<rideTrackerInstance.allRide.length;i++){
       
        if(rideTrackerInstance.allRide[i].cardid == cardid){
            rideForCard.push(rideTrackerInstance.allRide[i]);

        }

        

    }

    return rideForCard;

}

}