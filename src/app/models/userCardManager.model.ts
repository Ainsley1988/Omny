 export class UserCardManager{

    private userCardMap:Map<number,number[]>= new Map();

    linkUserToCard(Userid:number,cardId:number){
        if(!this.userCardMap.has(Userid)){
            this.userCardMap.set(Userid,[]);

        }
        this.userCardMap.get(Userid)!.push(cardId)
    }
    
    getUserCard(userId:number):number[] | undefined{
        return this.userCardMap.get(userId);
    }

 }