import { ChangeDetectorRef,Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import {Card} from '../models/cards.model';
import {User} from '../models/user.model'
import { CommonModule } from '@angular/common';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { PaymentCards } from '../models/paymentCard.model';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Travel } from '../models/travel.model';
import { RouterLink } from '@angular/router';
import { rideTracker } from '../models/rideTracker..model';
import { ModalService } from '../modal.service';
import { dummyManager } from '../models/dummyManager';
import  {Subscription} from "rxjs";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

 constructor(private modalService: ModalService,private dummyService: dummyManager){}
 credit:any[]=[];
 cards:any[]=[];//hold the card data
 userCard:any[] =[];// holds user card
 rides:Travel[]=[];
 currentUser!:User;
 log:any[]=[];
 dataReady: boolean = false;
 private modalSub?: Subscription;
 ngOnInit(): void {
//get the current user
  this.currentUser = this.dummyService.getCurrentUser();
// get the current cards
   this.dummyService.getCards$().subscribe(cards =>{
    this.cards = cards
   })

   this.dummyService.getPaymentCard$().subscribe(pay =>{
    this.credit = pay
  });

//get the list of travel cards
  this.dummyService.getTravel$().subscribe(move =>{
    this.rides = move
  });

  

  if (!this.dummyService.simulationRan) {
    this.simulateDemoRides();
    this.dummyService.simulationRan = true;
    
  }
  




 
 
 
   const rv = rideTracker.getInstance();
   this.userCard =[{fullname:'Ainsley'}]
   this.cards[3].setCustomImage({image:'stranger.jpg',x:'321',y:'159',size:'cover'})
    
   
  
   
   
   
  


   
   this.modalSub = this.modalService.updatedData$.subscribe((updatedData) => {
    this.updateCardname(updatedData.serialnumber, updatedData.cardName);
  });

 
 }
 
 simulateDemoRides(){
  //add card and to ride to similute 
this.dummyService.addTravel(this.cards[0],this.rides[0]);
this.dummyService.addTravel(this.credit[2],this.rides[1]);
//similate the omny taps 
this.dummyService.processTravelOmnyTaps(this.rides[0]);
this.dummyService.processTravelOmnyTaps(this.rides[1]);
//update the tap count
this.dummyService.updateTapDifferences();
}
 ngOnDestroy(): void {
  if (this.modalSub) {
    this.modalSub.unsubscribe();
    console.log('Unsubscribed from modalService.updatedData$');
  }
}
  


//dragged item functions
draggedCard: Card | null = null;
targetCard:Card | null =null;
parentElement: HTMLElement| null = null;
targetElement: HTMLElement| null = null;

//show the modal
showCardComparisonModal(draggedCard:Card, targetCard:Card) {
  
  const modalJob = { 
      scenario:'cardComparison',
      title:'Transfer Balance',
      data:{
      drag:draggedCard,
      target:targetCard,
      },}
        ;
  const result = this.modalService.openModal(modalJob);
  console.log("the modal service",modalJob.data.drag);
  if(result){
    // this.modalComponent.modalTitle = "Transfer Balance";
    // this.modalComponent.modalScenario = 'cardComparison';
    // this.modalComponent.modalData={
    //   draggedCard,targetCard
    // }
    
    // this.modalComponent.openModal();
    // console.log("modal should open");
  }else{
    console.log("Modal component is not defined");
  }
  
}
// edit card name
editModal(Car:Card){
  console.log("card",Car)
  const modalJob = { 
    scenario:'editCardComponent',
    title:'Edit Card name',
    data:{
    cardName:Car,
   
    },}
      ;
const result = this.modalService.openModal(modalJob);

}



  // Ensure this is the correct casing
  onDragStart(event: DragEvent, card: Card):void {
    
    this.draggedCard = card; // Set the dragged card
    event.dataTransfer?.setData('text/plain', JSON.stringify(card)); // Store the card data
    this.targetElement = event.currentTarget as HTMLElement; // Set the target element
    this.parentElement = this.targetElement?.parentElement; // Set the parent element
  // Apply styles to the dragged element to create the illusion
  this.targetElement.style.transition = 'transform 0.2s ease, opacity 0.2s ease'; // Smooth transition
  this.targetElement.style.transform = 'scale(1.1)'; // Make the element appear larger
  this.targetElement.style.opacity = '0.7'; // Slightly fade the element to create a "lifted" effect

  // Optionally, add a box-shadow to simulate elevation
  this.targetElement.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
  
    (this.targetElement as HTMLElement).classList.add("dragging-start");
    if(this.parentElement){
      Array.from(this.parentElement.children).forEach((sibling) =>{
        if(sibling !== this.targetElement){
(sibling as HTMLElement).classList.add("sibling-start");
console.log("the card not working");
        }
      })
    }
    
  }
  //grab the card info and call the modal to do the tranfer
  onDragOver(event: DragEvent, target: Card) {
    event.preventDefault(); // Allow dropping
    
    if(this.parentElement){
    let inAnyDragzone= false;
      Array.from(this.parentElement.children).forEach((siblings) =>{
        if(siblings !== this.targetElement){
          const siblingElement = siblings as HTMLElement;

          const siblingRectangle = siblingElement.getBoundingClientRect();
          const x = event.clientX;
          const y = event.clientY;
          const isInDragZone = x >= siblingRectangle.left && x <= siblingRectangle.right &&
          y >= siblingRectangle.top && y<=  siblingRectangle.bottom;
          const isLastSibling  = this.parentElement?.lastElementChild;

          if(isInDragZone){
              this.targetCard = target;
              siblingElement.classList.add("circles");
              
              //if drag is in the drop zone
              
              inAnyDragzone = true;

            }else{
             
              //this.targetCard = null;
              siblingElement.classList.remove("circles");
              siblingElement.classList.remove('sibling-start');
              
            }
            
            

        }

      });
      if(!inAnyDragzone){
 // if not in drag zone 
 console.log("not in dragzone");
 
 this.targetCard =null;
      }
      
    }

  }
  // drag end reset the container
  onDrop(event: DragEvent):void{
    let isDropped = false;
    if (this.targetElement) {
      this.targetElement.style.transform = ''; // Reset the scaling
      this.targetElement.style.opacity = ''; // Reset the opacity
      this.targetElement.style.boxShadow = ''; // Reset the box shadow
      this.targetElement.style.transition = ''; // Reset the transition for smoothness
      this.targetElement.classList.remove("dragging-start"); // Optionally remove the dragging-start class
    }
if(this.parentElement){
  Array.from(this.parentElement.children).forEach((sibling) =>{
if(sibling !== this.targetElement){
(sibling as HTMLElement).classList.remove('sibling-start');
(sibling as HTMLElement).classList.remove('circles');
this.targetCard= null;

}

  if(this.targetCard && this.draggedCard){
    this.showCardComparisonModal(this.draggedCard, this.targetCard);
  isDropped=true;
  }
  if(!isDropped){
    (sibling as HTMLElement).classList.remove('sibling-start');
(sibling as HTMLElement).classList.remove('circles');



  }


  
  
  })
}


this.targetElement = null;
this.parentElement = null;



  }


  
  
  //create background style base on the card
createBackgroundStyle(cards:Card){
  return {
    'background-image': `url(${cards.getCustomImage()?.image})`,
    'background-position': cards.getCustomImage()?.x+'px' +' ' + cards.getCustomImage()?.y+'px',
    'background-size': cards.getCustomImage()?.size,
  };
}
newName:string= "";
changeName = false;
toggleName(){
  this.changeName = !this.changeName;
}
Endme(){
  console.log("close");
}
// update cardname
updateCardname(serialnumber:number,newName:string): void{

  


  for(let i=0; i < this.cards.length;i++){
    if( serialnumber === this.cards[i].getSerialnumber()){

    this.cards[i].setCardname(newName);//update the card 

    break;

    }
  }
  
  this.changeName = false;

}

// add new card to the the list button
addNewCardClick():void{
console.log("the new Button");
this.startCamerca();
}
//show modal for capturing the card data 
captureCard(){

}





//register  card with omny
addCard(newcard:any[]):void{


  for(let j=0; j < this.cards.length;j++){


    let exist = this.cards.some(card => card.getSerialnumber() == newcard[j].serialnumber)// check if the card already exist in the current list
    if( !exist){ 
      this.cards.push(newcard[j])//pushed the new card to the list

    }
  
  
  
  }



}


//access  camera
async startCamerca(){

  try{
    const stream = await navigator.mediaDevices.getUserMedia({video:true});


  }
  catch{


  }




}








}
