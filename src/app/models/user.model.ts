import { BaseCard } from "./baseCard.model";
import { Card } from "./cards.model";

export class User{
    private static currentid:number=0;
    public  email:string;
    public fullname:string;
    public profileImg:string;
    protected  userId:number;
   
    
    //constuctor 
    constructor(Email:string,pic:string,name:string){

        this.email = Email;
        this.profileImg= pic;
        this.fullname=name;
        this.userId = User.currentid++;
        
       

    }
    //get full name
    public getFullname():string{
        return this.fullname;
    }
    //set full name 
    public setFullname(name:string):void{
 this.fullname=name;
    }
    //set profile image
    public setProfileIm(img:string):void{
this.profileImg=img;
    }
    //get the profile image
    public getProfileimg(){
        return this.profileImg;
    }
    public getUserID(){
        return this.userId;
    }
    

    
//get the login method
    public Startlogin(email:string,password:string){

        if(email && password){
            console.log("Login successful")
            return true;
        }
        console.error("invalid Login")

        return false;

    }
//

    






}