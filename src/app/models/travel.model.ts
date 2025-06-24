import{Card} from './cards.model'
import { PaymentCards } from './paymentCard.model';
import { BaseCard } from './baseCard.model';
import { rideTracker } from './rideTracker..model';
import { rideDetails } from './rideDetails.model';

export class Travel{

    public routeNumber:string; // the travel route train or bus
    public startTime:Date;// start time for the taps
    private _fare:number;// the fare
    private _taps:number;//count the number of taps
    private _pass:boolean = false;// check if the pass was free
    private _freeRideThreshold:number = 12;// check free ride threshold
    private _tapWindow: number= 7;// check timeframe for fares to resets
    private _tapHistory:Travel[]=[];// list of taps and dates
    private Omny:  Card | null = null; // Reference to class, not instance
  private debitcard: PaymentCards | null = null;
   private rideTracker: rideTracker;

    public location:{latitude:number,longitude:number}[] =[];
    //contructor 
    constructor(routeNumber:string,starttime:Date,fare:number,tappy:number,passy:boolean){

        this.routeNumber =routeNumber;
        this.startTime = starttime;
        this._fare = fare;
        this._taps = tappy;
        this._pass =passy
        this.rideTracker = new rideTracker(); // Initialize RideTracker

    }

    
//add  card to travel 
public addCard(card:BaseCard):void{
if(card instanceof Card){
    this.Omny = card;
    console.log("Omny card has been added", card.getCardId())

}else if(card instanceof PaymentCards){
    this.debitcard = card;

    console.log("Debit card has been added", card.getCardId());

} else{
    console.warn("Something went wrong");
}
}

//get the route travel
    public getRouteNumber():string{
return this.routeNumber
    }
    //change the route of travel
    public setRouteNumber(route:string):void{
        this.routeNumber=route;
    }
    // getter for the fare
    public getFare():number{
        return this._fare;
    }


    //settter for the fare

    public setFare(farevalue:number):void{
        if(farevalue < 0){
            throw new Error("Fare cannnot be negative");
        }
        this._fare = farevalue

    }
    //get the free ridethresshold
    public getFreeRideThreshold():number{
        return this._freeRideThreshold;
    }

    public setFreeRideThreshold(tapthreshold:number):void{
        if(tapthreshold <= 0){
            throw new Error("Fare threshold can not be negative or 0");

        }
        this._freeRideThreshold = tapthreshold;
    }
// get the taps count
    public getTaps():number{
        return this._taps;
    }

    // set the tap counts
     public setTaps(tapCount:number){
        if(this.Omny || this.Omny== null ){
            this._taps = tapCount;
        }
        else{
            console.log("No card is Attached",this.Omny);
        }

        
       
    }

    
    // get the passnumber
    public getPass(): boolean{
        
        return this._pass;

        

    }

    // check the pass
    public setPass(isOk:Card,fare:number): boolean{

        if(isOk.deductBalanace(fare)){

            this._pass = true;

        }


        return this._pass;

    }
// public addTapHistory(){
//     this._tapHistory.push(this);
// }
public getTapHistory(){
    return this._tapHistory;
}
    // process the number of valid taps
    public processOmnyTaps(): boolean{
     const currentDate = new Date();
       // Check if there's no card associated with the Travel instance
       // Process payment or free ride eligibility
    const card = this.Omny || this.debitcard;
    if (!card) {
        console.warn("No card associated with the travel instance");
        this._pass = false;
        return false;
    }

    // check of the card is blocked
    if(this.debitcard?.getBlockCard() == true ){
        console.warn("The card has been blocked");
        this._pass =false;
        return false;
    }
     // Check if free ride threshold has been reached
     if (this._taps >= this._freeRideThreshold) {

        
        //log the ride
        if(card !==null){
            rideTracker.getInstance().logRide(card,this.routeNumber,this.location,true);

        }
        this._pass = true;
    }
    
    const isDeducted = this.Omny ? this.Omny.deductBalanace(this._fare) :this.debitcard?.deductBalanace(this._fare);// performs the deductions
    // Attempt to deduct balance from the associated card
    if (isDeducted) { // Deduct balance if fare is available
        this._taps++;
        
        if(card !==null){
           
            rideTracker.getInstance().logRide(card,this.routeNumber,this.location,false);
           

        }
        return true;
    } else {
        this._pass = false;
        return false;
    }
        
        
        

    }
    
    
    //gset the location of the travel for maps 
    public setLocation(lat:number,long:number):void{
        if(isNaN(lat) || isNaN(long)){

            console.warn("invalid coordinates");

            return;

        }

        this.location.push({latitude:lat,longitude:long})

    }
//
    public getLocation(){
        return this.location;
    }

    // get the taps for each  omny cards 
    public getOmnyTapsFromID(serialnumber:number){
        const tap=[];
        for(let i:number=0;i < this._tapHistory.length;i++){// 
            if(this._tapHistory[i].Omny?.getSerialnumber() ==serialnumber){// check if any results match the serial number 
                tap.push(this._tapHistory[i]);

            }
 
        }


        return tap;
    }

    //get the debit card taps based on last for #
    public getDebitCardTaps(lastfour:number){
        const tap=[];
        console.warn(lastfour);
        for(let i:number=0;i < this._tapHistory.length;i++){ //loop through the tap list
            if(this._tapHistory[i].debitcard?.getLastFour() == lastfour){ // loop for taps that match debit cards
                
                console.warn(this._tapHistory[i].debitcard?.getLastFour());//
                tap.push(this._tapHistory[i]);// push the result to the arrayh

            }
 
        }


        return tap; // return the object array


    }
  
public getRideByCardid(cardid:number): rideDetails[]{
    return this.rideTracker.getRideByCardid(cardid);
}
    
    

   

    



}