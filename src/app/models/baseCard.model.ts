import { booleanAttribute } from "@angular/core";
import { rideTracker } from "./rideTracker..model";

export abstract class BaseCard{
    private static currentid:number=0;

    protected expirationDate:Date;
    protected cardName?:string
    protected blockCard:boolean
    protected  cardId:number;
    // protected isAdminBlock:boolean
    tapDifference!:number;
//constructor
constructor(expireDate:Date,cname:string,block:boolean){
    
    this.cardName= cname;
    this.expirationDate = expireDate;
    this.blockCard = block;

    this.cardId = BaseCard.currentid++;
    

}


public getCardId():number{
    return this.cardId;
}
// get the current expiration date
    public getExpirationDate():Date{

        return this.expirationDate;

    }

    // block the card ... toggle it 
    public setBlockCard(isblocked:boolean):void{

        this.blockCard = isblocked;

    }
   
    // get the status of the card
    public getBlockCard():boolean{
        return this.blockCard;
    }
    public getTapCount():number{
        return rideTracker.getInstance().getTapCountByCardId(this.cardId);
    }
    public getTapDifference():number{
    
       
        return rideTracker.getInstance().getTapDifference(this.cardId);
    }
//     public setAdminBlock(adminBlock:boolean):void{
// this.isAdminBlock = adminBlock;
//     }

//     public getAdminBlock():boolean{
//         return this.isAdminBlock;
//     }
    abstract deductBalanace(fare:number):boolean;

    
}