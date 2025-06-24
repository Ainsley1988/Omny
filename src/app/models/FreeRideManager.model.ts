import { from } from 'rxjs';
import{Card} from './cards.model'
import { User } from "./user.model";
export class FreeRideManager{
    private activeRequest:boolean;
    private  amount:number;
    private message:string;
    private fromUserID:number;
    private toUserid:number;
    private cardId:number | null;
    private blocked:boolean | null;


constructor(active:boolean,blocked:boolean,amount:number,message:string,fromUserid:number,toUserid:number,cardid:number){
    this.activeRequest =active;// if request is active
    this.blocked =blocked; // request from user is blocked
    this.amount = amount; // amount asked
    this.message = message; //message
    this.fromUserID= fromUserid; // request from
    this.toUserid= toUserid; // request being sent to
    this.cardId = cardid;

    
}

public getFromUser():number{
    return this.fromUserID;
}

public getToUser():number{
    return this.toUserid;
}

public getAmount():number{
    return this.amount;
}



    //request funds from friend 
    public requestFunds(fromFriend:number,toFriend:number,amount:number,card:Card):boolean{
        if(this.activeRequest){// if there is already a request
console.error("There is already an active request");
return false;
        }
       
       
               if(!card || !card.getCardId()){
                   console.error("No card exist with that ID ");
                   
                   return false;
               }


       
      this.activeRequest =true;
      this.amount = amount;
      this.cardId = card.getSerialnumber();
      this.fromUserID = fromFriend;
      this.toUserid = toFriend;
      this.message = this.sendMessage(toFriend,true);
       
               return  true;
       
           }
       //send message based on the request
    public sendMessage(friend:number,sending:boolean):string{

            if(sending){
                return `Hello ${friend}, you have a request for $${this.amount} from  Please approve or deny the request.`;
            } else{
                return "";

            }
       
       
               
           }
       //send funds to a friend
    public sendFunds(mycard:Card,amount:number,thierCard:Card):boolean{
//if the request is active and the user is not blocked 
            if(this.activeRequest && !this.blocked){
        mycard.transferbalance(mycard,thierCard,amount);
        this.resetRequestState();
        return true;
            }

       console.error("the transfer failed ");
               return false;//
           }

//reset the request 
    public resetRequestState():void{
            this.activeRequest=false;
            this.amount=0;
            this.message="";
           
           }
       
           
}