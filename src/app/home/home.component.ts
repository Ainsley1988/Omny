import { Component, OnInit, ViewChild } from '@angular/core';
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



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 constructor(private modalService: ModalService){}
  
  // @ViewChild(ModalFormComponent) modalComponent : ModalFormComponent | undefined;

dummyCards:Card[] =[


new Card(23839234,30,false,new Date('2024-12-31'),"Student","Allison Sweeney",true),
new Card(38992939,35,true,new Date('2024-12-31'),"Default","Lisa Tepes",true),
new Card(68992939,35,true,new Date('2024-12-31'),"Default","Jason Miller",true),
new Card(48992939,35,true,new Date('2024-12-31'),"Custom","Charlie Thompson",true),



];
dummyTravel:Travel[]=[
  new Travel("BX12", new Date('2024-12-31'), 1,3, false),
  new Travel("BX15", new Date('2024-12-31'),1, 12, true),
];
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


  dummyCredit:PaymentCards[] =[


    new PaymentCards(new Date('2024-12-31'),"Visa",2839,"Mellia Hart",false),
    new PaymentCards(new Date('2024-12-31'),"Visa",2839,"Mellia Hart",false),
    new PaymentCards(new Date('2024-12-31'),"Visa",2839,"Mellia Hart",false),
    new PaymentCards(new Date('2024-12-31'),"Visa",3839,"Mellia Hart",false),
    new PaymentCards(new Date('2024-12-31'),"Visa",4839,"Mellia Hart",false)
    
    
    
    
    ];

  credit:any[]=[];
  cards:any[]=[];//hold the card data
  userCard:any[] =[];// holds user card
  rides:any[]=[];
  log:any[]=[];
  
  ngOnInit(): void {

    this.cards =this.dummyCards;//initialize card array with dummy data
    this.credit = this.dummyCredit;
    this.rides = this.dummyTravel;
    this.rides[0].addCard(this.cards[3])
    this.rides[0].processOmnyTaps();
    this.rides[1].addCard(this.credit[1]);
    this.rides[1].processOmnyTaps();
   
  const rv = rideTracker.getInstance();
    console.log("list of ride by card", rv.getRideByCardid(this.credit[1]));
    this.userCard =[{fullname:'Ainsley'}]
    this.cards[3].setCustomImage({image:'stranger.jpg',x:'321',y:'159',size:'cover'})
    console.log("the card is blocked",this.cards[3].getCustomImage().image);
    
   
    
    // console.log("get the tap list",this.credit[1].travel.getDebitCardTaps(3839));
    
    this.cards.forEach(card => {
      card.tapDifference = card.getTapDifference(); // Add a tapDifference property
  });
  this.credit.forEach(cred =>{
    cred.tapDifference= cred.getTapDifference();
  });

    
  this.modalService.updatedData$.subscribe((updatedData) => {
    console.log("the return is working",updatedData.cardName);
    this.updateCardname(updatedData.serialnumber,updatedData.cardName);
    
    
   
  });
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

  const card = this.dummyCards.find(card => card.getSerialnumber() === serialnumber);


  for(let i=0; i < this.dummyCards.length;i++){
    if( serialnumber === this.dummyCards[i].getSerialnumber()){

    this.dummyCards[i].setCardname(newName);//update the card 

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


  for(let j=0; j < this.dummyCards.length;j++){


    let exist = this.dummyCards.some(card => card.getSerialnumber() == newcard[j].serialnumber)// check if the card already exist in the current list
    if( !exist){ 
      this.dummyCards.push(newcard[j])//pushed the new card to the list

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
