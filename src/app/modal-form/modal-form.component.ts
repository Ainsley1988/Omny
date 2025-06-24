import { Component,Input,Output, PLATFORM_ID,Inject,EventEmitter, OnInit,ViewChild,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Card} from '../models/cards.model';
import { FormsModule } from '@angular/forms'; // Import FormsModule for this component
import { ModalService } from '../modal.service';
import { EditCardComponent } from './EditCardComponent';
import { transferCardCompoonent } from "./transferCardComponent";
import { SendMoneyComponent } from './SendMoneyComponent';




@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule, EditCardComponent, transferCardCompoonent,SendMoneyComponent],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent implements OnInit {
@ViewChild('dynamicContent', { read: ViewContainerRef }) dynamicContent!: ViewContainerRef;

@Input() modalTitle: string = " ";//set the modaltitle
@Input() modalContent: string = " ";
@Input() isVisiable = false;//status of the modal
@Input() modalData:any = null;
@Input() modalScenario: 'default' | 'cardComparison' | 'editCardComponent' | 'sendMoneyComponent' |'infoDisplay' = 'default';// modal scenario
@Input() modalCss:string = "default";
@Output() close = new EventEmitter<void>();  // Correctly typed EventEmitter


  // constructor(@Inject(PLATFORM_ID) private platformId:Object) {}
  constructor(private modalService: ModalService,private resolver: ComponentFactoryResolver) {}

  //form submit update
  onFormSubmit(): void {
    this.closeModal();//call the close modal
    this.updateBodyScroll();// calls the update body to remove modal backdrop
  }
  //close modal function
  closeModal():void{

if(this.isVisiable){ // check is modal is  visible 
  this.isVisiable =false;// update the is visable value 
  this.close.emit();// lists for the close emitter

}

}

//open modal function
  openModal(){
    this.isVisiable = true// set visible to true
    document.documentElement.classList.add('no-scroll');//add the no scrolling class to css
    
    
  }
  // on overlay click close the modal and  remove the overlay
  closOverlayOnClick(event:MouseEvent){
    const target = event.target as HTMLElement;
    if(target.classList.contains("modal-overlay")){// check if the element contains the class modal-overlay
 this.closeModal();// close modal function is called
 this.updateBodyScroll();
    }
  }
  updateBodyScroll() {
    if (this.isVisiable) {
     
      document.documentElement.classList.add('no-scroll');// add the no scroll class
    } else {
      
      document.documentElement.classList.remove('no-scroll');//remove no scroll class
    }
  }
  
  //decide witch modal scenario to use
loadScenarioComponent(){

  let component: any;
  
  switch(this.modalScenario){
    case 'cardComparison': //scenario when tranfering card balance
    component= transferCardCompoonent;
    this.modalCss="cardcomparison"
      break;
    case 'editCardComponent'://scenario when editing the name of card
      component = EditCardComponent;// reference to the edit card component
      this.modalCss= "EditMode";
      break;
    case 'sendMoneyComponent':
      component = SendMoneyComponent;
      this.modalCss="moneyTransfer";
      
      break;
    
    case 'default':
  }

}
  ngOnInit():void {
    console.log("ModalFormComponent initializing...");
    this.modalService.registerModal(this); // Register this component with the service
    this.updateBodyScroll
    this.modalService.modalData$.subscribe((data) =>{
      console.log("the data card", data?.data?.drag);
if(data){
  console.log("data dog");
  this.modalTitle = data.title ||"Default title";
  this.modalScenario = data.scenario;
  this,this.modalData= data.data
  
  

  this.loadScenarioComponent();
  this.isVisiable = true
}


    })
   
    
  }

  ngOnDestroy() {
    // Remove the no-scroll class when the modal is closed
    // document.body.classList.remove('no-scroll');
  }

// submit the balance transfer 
transferAmount: number| null = null;  // Amount to transfer

submitTransfer(event: Event){
  event.preventDefault();
  
const draggedCard = this.modalData.draggedCard;
const targetCard = this.modalData.targetCard;

if(this.transferAmount  != null && this.transferAmount > 0  ){
  targetCard.transferbalance(targetCard,draggedCard,this.transferAmount);
  
  this.closeModal();

}
else{
  console.log("error something went wrong");
}



}




}
