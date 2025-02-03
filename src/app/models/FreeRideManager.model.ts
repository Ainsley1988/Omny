import { from } from 'rxjs';
import{Card} from './cards.model'
import { User } from "./user.model";
export class FreeRideManager{
    private activeRequest:boolean;
    private  amount:number;
    private message:string;
    private fromUserID:number | null;
    private toUserid:number | null;
    private cardId:number | null;
    private blocked:boolean | null;


constructor(active:boolean,blocked:boolean,amount:number,message:string,fromUserid:number,toUserid:number,cardid:number){
    this.activeRequest =active;
    this.blocked =blocked;
    this.amount = amount;
    this.message = message;
    this.fromUserID= fromUserid;
    this.toUserid= toUserid;
    this.cardId = cardid;

    
}



    //request funds from friend 
    public requestFunds(friend:User,me:User,amount:number,card:Card):boolean{
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
      this.cardId = card.getCardId();
      this.fromUserID = me.getUserID();
      this.toUserid = friend.getUserID();
      this.message =this.sendMessage(friend,true);
       
               return  true;
       
           }
       //send message based on the request
    public sendMessage(friend:User,sending:boolean):string{

            if(sending){
                return `Hello ${friend.getFullname()}, you have a request for $${this.amount} from  Please approve or deny the request.`;
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
            this.fromUserID=0;
            this.toUserid=0;
           }
       
           
}