import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FreeRideManager } from '../models/FreeRideManager.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  dummyUsers:User[] =[


    new User("Ainsley@google.com","photoone.jpg","Nadia Axel"),
    new User("Ainsley@google.com","phototwo.jpg","Nadia Axel"),
    new User("Ainsley@google.com","photothree.jpeg","Nadia Axel"),
    new User("Ainsley@google.com","photofour.webp","Nadia Axel"),
    
    
    
    ];
    freeRides: FreeRideManager | null = null;
    users:any[]=[];//hold the card data
    ngOnInit(): void {

      this.users =this.dummyUsers;//initialize card array with dummy data
      this.users[0].setProfileIm("photoone.jpg");
       console.log("users",this.users[0].getFullname())

    }
//request fare from another user
 requestFare(amount:number,email:string){

  if(this.checkUserExist(email)){


  }

 }
//send fare to friend 
 sendFare(){

 }
    
// check if the users exists
checkUserExist(email:string){
  if(!email){

return false;
  }
  return this.dummyUsers.some(user=> user.email.toLowerCase() == email.toLowerCase())

}



}
