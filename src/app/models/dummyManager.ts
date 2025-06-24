import { User} from "./user.model";
import {Card} from "./cards.model"
import { PaymentCards } from "./paymentCard.model";
import { Travel } from "./travel.model";
import { UserCardManager } from "./userCardManager.model";
import { FreeRideManager } from "./FreeRideManager.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject,Observable} from "rxjs";
import { BaseCard } from "./baseCard.model";
import { Activity } from "./activity.model";

@Injectable({
    providedIn:"root"
})
export class dummyManager{
  public simulationRan = false;
private initialUsers:User[]=[

    new User("Ainsley@google.com","photoone.jpg","Jamie Oliver"),
    new User("Ainsley@google.com","phototwo.jpg","Jack Ahole"),
    new User("Ainsley@google.com","photothree.jpeg","Amy Meheart"),
    new User("Ainsley@google.com","photofour.webp","Joe Blow"),

];

    //dummyomny cards
    private initialCards: Card[] = [
        new Card(23839234, 30, false, new Date('2024-12-31'), "Student", "Allison Sweeney", true),
        new Card(38992939, 35, true, new Date('2024-12-31'), "Default", "Lisa Tepes", true),
        new Card(68992939, 35, true, new Date('2024-12-31'), "Default", "Jason Miller", true),
        new Card(48992939, 35, true, new Date('2024-12-31'), "Custom", "Charlie Thompson", true)
      ];

      
//link cards to users
      public linkUserCard(userid:number,cardid:number){
const cardManager = new UserCardManager;



cardManager.linkUserToCard(userid,cardid);

        

      }

      
    
      private cardsSubject: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(this.initialCards);
//dummy travel records
      private initialTravel:Travel[]=[
        new Travel("BX12", new Date('2024-12-31'), 1, 3, false),
        new Travel("BX12", new Date('2024-12-31'), 1, 3, false)

      ];



      private travelSubject:BehaviorSubject<Travel[]> = new BehaviorSubject<Travel[]>(this.initialTravel);


    //dummyrecords for free rides request
      private initialFRideRequest:FreeRideManager[]=[
        new FreeRideManager(true,false,10,"Can I get a ride",2,0,3839234),
        new FreeRideManager(false,false,10,"Can I get a ride",3,0,38992939),
        new FreeRideManager(true,false,10,"Can I get a ride",1,0,48992939),
        



      ];
      private freeRideSubject:BehaviorSubject<FreeRideManager[]> = new BehaviorSubject<FreeRideManager[]>(this.initialFRideRequest)
    //   public getFrequest$():Observable<FreeRideManager[]>{
    //     return this.cardsSubject.asObservable();
    //   }
    public getCards(cardid:number){

        const card= this.initialCards.find(card=> card.getCardId() == cardid);
        return card ? [card] : [];

      }
      public getCards$(): Observable<Card[]> {
        return this.cardsSubject.asObservable();
      }
      //
      public getFreeRides$():Observable<FreeRideManager[]>{
return this.freeRideSubject.asObservable();
      }

      //
      public getFreeRides():FreeRideManager[]{
        return this.freeRideSubject.value;
      }
//
      public getTravel$():Observable<Travel[]>{
        return this.travelSubject.asObservable();
      }
      //
      public getTravel():Travel[]{
        return this.travelSubject.value;
      }
      getActiveRRequest(isActive:boolean){

      }

      //get the user by userid
      getUserById(userid:number):User{
        return this.initialUsers.find(user=> user.getUserID() == userid)!;
      }
//Dummy debitcards
      private initialDebitCard:PaymentCards[]=[
        new PaymentCards(new Date('2024-12-31'),"Visa",2839,"Mellia Hart",false),
        new PaymentCards(new Date('2024-12-31'),"Visa",3439,"Mellia Hart",false),
        new PaymentCards(new Date('2024-12-31'),"Visa",2439,"Mellia Hart",false),
        new PaymentCards(new Date('2024-12-31'),"Visa",8339,"Mellia Hart",false),
        new PaymentCards(new Date('2024-12-31'),"Visa",9339,"Mellia Hart",false)
      ]


      

      private paymentSubject:BehaviorSubject<PaymentCards[]> = new BehaviorSubject<PaymentCards[]>(this.initialDebitCard);

      public getPaymentCard$():Observable<PaymentCards[]>{
        return this.paymentSubject.asObservable();
      }
      public getPaymentCard(cardid:number):PaymentCards[]{
        console.log("payment card id", cardid);
        const card = this.initialDebitCard.find(card => card.getCardId() == cardid);
        return card ? [card] : [];
      }
      //add the cards to the travel object
      public addTravel(card:BaseCard,travel:Travel):void{
     
        travel.addCard(card);

        this.travelSubject.next([...this.getTravel()])


      }

      //process the omny taps 
      public processTravelOmnyTaps(travel:Travel):void{
        travel.processOmnyTaps();

        
        this.travelSubject.next([...this.getTravel()]);

      }
    //update the taps differenct
      public updateTapDifferences(): void {
        const prevCards = this.cardsSubject.value;
        const updatedCards = this.cardsSubject.value.map(card => {
          const newTapDiff = card.getTapDifference(); // Directly using the method in Card class
      
          if( card.tapDifference !== newTapDiff){
            card.tapDifference = newTapDiff;
          }
          return card;
        });
    
        const hasChanged = updatedCards.some((card, i) => card.tapDifference !== prevCards[i].tapDifference);

if (hasChanged) {
  this.cardsSubject.next([...updatedCards]);
}

        const updateDebitcard = this.paymentSubject.value.map(pay =>{
            pay.tapDifference = pay.getTapDifference();
           
            return pay;
        });
        this.paymentSubject.next([...updateDebitcard]);
      }

      private currentUser:User=this.initialUsers[0];

// get the current user
      getCurrentUser():User{
        return this.currentUser;
      }



      //Dummy activity log 
      private initialActivityLog:Activity[]=[
        new Activity("ride","OmnyCard",23839234, { station: "14th St", fare: 2.90, mode: "bus" }),
        new Activity("top-up","DebitCard", 23839234, { amount: 20.00, method: "cash" }),
        new Activity("transfer","OmnyCard",23839234, { from: "bus", to: "subway", isFree: true }),
        new Activity("top-up","DebitCard",23839234, { station: "14th St", fare: 2.90, mode: "bus" }),
        new Activity("ride","OmnyCard",23839234, { station: "Simpson St", fare: 2.90, mode: "Subway",line:6 }),
        new Activity("ride","OmnyCard",23839234, { station: "14th St", fare: 2.90, mode: "bus",line:6  }),
        new Activity("ride","OmnyCard",23839234, { station: "14th St", fare: 2.90, mode: "bus",line:6  }),
      ]




}

