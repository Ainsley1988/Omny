import exp from "constants";
import { BaseCard } from "./baseCard.model";
import { formatNumber } from "@angular/common";
import { CardComponent } from "../card/card.component";
import { Travel } from "./travel.model";
import { Card } from "./cards.model";

export class PaymentCards extends BaseCard{

    private cardType:string;
    private lastfour:number;
    private _balance:number=0;
    public travel?:Travel;
    private card?:Card;
    
    constructor(expires:Date,cardType:string,fourNumbers:number,cardName:string,blockedCard:boolean){
        super(expires,cardName,blockedCard)


        this.cardType = cardType;
        this.lastfour = fourNumbers;
        
    }
// get the card type 
    public getCardType():string{
        return this.cardType;
    }

    public setCardType(processorname:string):void{
        this.cardType= processorname;
    }
// get the last4 digits of the card
    public getLastFour():number{


        return this.lastfour;

    }
//since payment coming from external sources we only need to check approval
    public deductBalanace(amount:number): boolean{
        if(this.blockCard){
            console.warn("Card is blocked cannot be used");
            return false;
        }
        if(this.isPaymentApproved(amount)){

            return true;

        }
        else{
            return false;
        }

        

    }
    public getBalance():number{


        return this._balance;

    }
    public setBalance(fare:number):void{

        this._balance =+fare;
       this.updateBlockStatus();

    }

    private updateBlockStatus():void{
        if(this._balance <=0){
this.blockCard=false;
        }else{
            this.blockCard=true;
        }
    }
//similating payment approval for external cards 80% approval rate
    private isPaymentApproved(fare:number):boolean{

        const paymentApproved:boolean = Math.random()>0.2;

        return paymentApproved;
    }
   
    //tap up the card for omny
    public topUpCard(amount:number):void{
        if(this.card){
            const success =this.card.addBalance(amount);
            if(success){
console.log("Top-up successfull");
            }
            else{
                console.warn("Failed to top up");
            }
        }else{
            console.warn("No OMNY card associated ");
        }
    }

     //add omny card so the card can be top up
     public addOmny(cards:Card){
        this.card = cards;


        
    }

    // public addTravel(travel:Travel){
    //     this.travel = travel;
    //     travel.setDebit(this);
    // }

    
   





}