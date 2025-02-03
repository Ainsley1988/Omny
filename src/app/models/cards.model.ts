import exp from "constants";
import { BaseCard } from "./baseCard.model";
import { Travel } from "./travel.model";

export class Card extends BaseCard{
    

    private serialnumber:number;
    private _balance:number;
    public cardname?:string;
    public cardtype:string;
    private _status:boolean;// check if the card is in good standing
    public travel:Travel | null=null;
    private static currentCardId = 1;
    private customimge:{
        image:string;
        x:string,
        y:string,
        size:string

    } | null =null; // Initialize with an empty array

    
//constructor 
    constructor(serial:number,cardvalue:number,blockCard:boolean,expiring:Date,cardType:string,fullname:string,state:boolean){
        super(expiring,fullname,blockCard);
        this.serialnumber = serial;
        this._balance = cardvalue;
        this.cardtype = cardType;
        this.cardname = fullname;
        this._status = state;
        


    }




    public setCardname(newName:string):void{

        this.cardname = newName;

    }

// get the serial number

public getSerialnumber():number{
    return this.serialnumber;
}

    // getter for the  balance
    public getBalance():number{
        return this._balance;
    }

// return the status of the card to see if its in good standing
    public getStatus():boolean{
        return this._status;
    }

    public setStatus(state:boolean){
        this._status = state;

    }

//add name to
    public setName(fullname:string){
this.cardname = fullname;

       
    }

// add balance
    public addBalance(money:number):boolean{
        if(money > 0){// insure the money added is not negative 
            this._balance +=  money;

            return true;
        }

        


        return false;

    }
    //deduct fare from card
    public deductBalanace(amount:number): boolean{
        if(this._balance > amount){// check that the ba

            this._balance -= amount;

            return true;

        }

        return false;
    }

    public override getExpirationDate(): Date {
        return super.getExpirationDate();
    }
    
    // transfer balance from one card to the other return boolean value 
    public transferbalance(incomingCard:Card,outgoingCard:Card,amount:number){

        if(incomingCard.getStatus() && outgoingCard.getStatus()){// check to insure  both cards are valid 
            if(outgoingCard.getBalance() >= amount){

                outgoingCard.deductBalanace(amount);// deduct balance
                incomingCard.addBalance(amount);// add balance

                console.info("the new balance",incomingCard.getBalance());


                return true;

            }else{
                console.log("Insufficient balance");

            }

        
        return true;
        } else{

        }

return false;

    }
    //
    // public addTravel(travel:Travel):void{
    //     this.travel = travel;
       
    // }
    // public getTravel():Travel|null{
    //     return this.travel;
    // }
//
    public setCustomImage(config: { image: string; x: string; y: string; size: string }):void{

        if(this.cardtype =="Custom"){
            this.customimge = {
                image:config.image,
                x:config.x,
                y:config.y,
                size:config.size
            };
        
        }else{
            console.warn("Somethinf went wrong");
        }
        


    }
    public getCustomImage(): { image: string; x: string; y: string; size: string } | null {
        return this.customimge;
      }
   


}