import { Component, EventEmitter, Input, Output,PLATFORM_ID,Inject, } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ModalService } from "../modal.service";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-money-card',
  standalone: true, // Indicates this component is standalone
  imports: [FormsModule], // Import FormsModule here
  template: `
    <div>
      <p>serial #:{{data.cardName.serialnumber}}</p>
      <form class="block-form" (ngSubmit)="saveCardChanges()">
        <label for="name">Name</label>
        <input id="name" [(ngModel)]="data.cardName.cardName" [ngModelOptions]="{standalone: true}"/>
        <button type="submit">Save</button>
      </form>
      <div *ngFor="let request of data">
        <h2>{{request.fRequest}}</h2>

      </div>
    </div>
  `,
  styles: [`
    .block-form {
      display: block;
      
      margin: 0 auto;
      padding: 20px;
      
      
    }

    .block-form label {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .block-form input {
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
      height:25px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size:20px;
    }

    .block-form button {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .block-form button:hover {
      background-color: #0056b3;
    }
  `]
})
export class SendMoneyComponent  {
  @Input() data: any;//input from the modalservice
  @Output() submit = new EventEmitter<void>(); 
  
constructor(private modalService: ModalService){}



// update the card name and send the data back to home component for update
  saveCardChanges():void {
    console.log("IG data",this.data);
    this.modalService.sendModalData(this.data.cardName);//send the data to the card homecomponent to update the data
    this.submit.emit();// listens for the changes in he modalservice
    
    
    
  }

  
}