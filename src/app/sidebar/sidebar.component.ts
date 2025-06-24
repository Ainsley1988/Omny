import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FreeRideManager } from '../models/FreeRideManager.model';
import { dummyManager } from '../models/dummyManager';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  currentUser!:User;
  
  constructor(private dummyService:dummyManager,private modalService: ModalService){};
  dummyUsers:User[] =[


    new User("Ainsley@google.com","photoone.jpg","Nadia Axel"),
    new User("Ainsley@google.com","phototwo.jpg","Nadia Axel"),
    new User("Ainsley@google.com","photothree.jpeg","Nadia Axel"),
    new User("Ainsley@google.com","photofour.webp","Nadia Axel"),
    
    
    
    ];
    freeRides: any[] =[];
    users:any[]=[];//hold the card data
    isHovered=false;
    ngOnInit(): void {
      this.currentUser = this.dummyService.getCurrentUser();

      this.users =this.dummyUsers;//initialize card array with dummy data
      this.users[0].setProfileIm("photoone.jpg");
       console.log("users",this.users[0].getFullname())
      
       this.dummyService.getFreeRides$().subscribe(askFride =>{
        this.freeRides = askFride.map(ride =>({
          ...ride,
          requester:this.dummyService.getUserById(ride.getFromUser()),//this is who is asking for the ride
          sender:this.dummyService.getUserById(this.currentUser.getUserID())//this is who is getting the resequest for the ride
        }));
       
       })
       

    }


elementId: HTMLElement| null = null;

onMouseEnter(event:MouseEvent){
  
}
updateBoxPosition(event:MouseEvent){
  
    this.elementId = document.getElementById("moneyBox");
    
    if (this.elementId) {
      this.elementId.style.left = event.clientX + "px";
      this.elementId.style.top = event.clientY + 10 + "px";
      this.elementId.style.transform = "translate(-50%, -50%)"; // Centers box on the cursor
    }
  

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

askForMoney(){
  console.log("card",this.isHovered)
  const modalJob = { 
    scenario:'sendMoneyComponent',
    title:'Omny Send Money',
    data:{
    fRequest:this.freeRides,
   
    },}
      ;
const result = this.modalService.openModal(modalJob);

}



}
