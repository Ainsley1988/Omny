import { User} from "./user.model";
import {Card} from "./cards.model"
import { PaymentCards } from "./paymentCard.model";
import { Travel } from "./travel.model";
import { UserCardManager } from "./userCardManager.model";
import { FreeRideManager } from "./FreeRideManager.model";
export class dummyManager{
//handle the dummy cards and dummy transactions

    //static array for the dummy records
    public static users:User[]=[

       
        new User("Ainsley@google.com","photoone.jpg","Nadia Axel"),
    new User("Ainsley@google.com","phototwo.jpg","Nadia Axel"),
    new User("Ainsley@google.com","photothree.jpeg","Nadia Axel"),
    new User("Ainsley@google.com","photofour.webp","Nadia Axel"),


    ];


    public cards:Card[]=[


        new Card(23839234,30,false,new Date('2024-12-31'),"Student","Allison Sweeney",true),
        new Card(38992939,35,true,new Date('2024-12-31'),"Default","Lisa Tepes",true),
        new Card(68992939,35,true,new Date('2024-12-31'),"Default","Jason Miller",true),
        new Card(48992939,35,true,new Date('2024-12-31'),"Custom","Charlie Thompson",true),
        
    

];

// get all the cards for the dummy records
public  getCards():Card[]{
    return this.cards;
}
public static debit:PaymentCards[]=[

    new PaymentCards(new Date('2024-12-31'),"Visa",2839,"Mellia Hart",false),
    new PaymentCards(new Date('2024-12-31'),"Visa",2839,"Mellia Hart",false),
    new PaymentCards(new Date('2024-12-31'),"Visa",2839,"Mellia Hart",false),
    new PaymentCards(new Date('2024-12-31'),"Visa",3839,"Mellia Hart",false),
    new PaymentCards(new Date('2024-12-31'),"Visa",4839,"Mellia Hart",false)

]
//return all the debit cards
public static getDebitCard():PaymentCards[]{
    return this.debit;
}

//
// public static getDebitCardbyID(userid:number):Card[]{
//     // const cardids= UserCardManager.m
// return this.cards
// }
public static travel:Travel[]=[

    new Travel("BX12", new Date('2024-12-31'), 1,3, false),
    new Travel("BX15", new Date('2024-12-31'),1, 12, true),

]
public static freeRide:FreeRideManager[]=[
 new FreeRideManager(false,false,10,"help me",2,3,2132919)

]


//link the card with user card manger 



}

