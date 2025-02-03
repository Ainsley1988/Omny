import { Component, EventEmitter, Input, Output,PLATFORM_ID,Inject, } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ModalService } from "../modal.service";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-transfer-balance',
    standalone: true, // Indicates this component is standalone
    imports: [FormsModule,CommonModule], // Import FormsModule here
    template: `
      <div class="cardsLoading">
            <div class="change-card">
                <div class="changebox changebox-black">
                   <div>
<div class="pill">
    <p class="nameText">
        {{data.drag.cardname}}
    </p>

</div>
                    
                   </div> 
                  <div class="balance">
                    <p>Your balance</p>
                    <div class="dollars">{{data.drag.getBalance() | currency:'USD':'symbol'}}</div>
                    </div>
                    <div>OMNY Student</div>
                  <div class="pinner">
                    <div>
                        <p>Serial number</p>
                        <p>{{data.drag.getSerialnumber()}}</p>
                        
                    </div>
                    <div>
                        <p>Valid thru</p>
                        {{data.drag.getExpirationDate() | date:'shortDate'}}

                    </div>
                    </div>
                
                </div>
                
                
            </div>
            <div class="line-container">
<div class="loading-line"></div>
            </div>
            <div class="change-card">
                <div class="changebox changebox-purple">
                    <div>

                        <div class="pill">
                            <p class="nameText">{{data.target.cardname}}</p>
                        </div>
                    </div>
                   
                    <div class="balance">
                        <p>Their balance</p>
                        <div class="dollars">{{data.target.getBalance() | currency:'USD':'symbol'}}</div>
                    </div>
                    <div>OMNY Reduced</div>
                    <div class="pinner">
                        <div>
                            <p>Serial number</p>
                            <p>{{data.target.getSerialnumber()}}</p>
                        </div>
                        <div>
                            <p>Valid thru</p>
                            <p>{{data.target.getExpirationDate() | date:'shortDate'}}</p>
                        </div>
                    </div>
                   
                </div>
                
            </div>
            
           

        </div>

        <div class=" ">
            <form (ngSubmit)="submitTransfer()"  #form="ngForm">
                <div class="tranferContainer">
              <input type="number" id="amount" class="changeMe" [(ngModel)]="transferAmount" name="amount" required />
              <div *ngIf="form.controls['amount']?.invalid && form.controls['amount']?.touched" class="error-message">
                Amount is required.
              </div>
          
              <button type="submit" class="btn btn-blue btn-block">Send</button>
              </div>
            </form>
          </div>
    `,
    styles: [`
      /* transfer container */
.cardcomparison .tranferContainer{
width:300px;
margin:0 auto;
display:flex;
flex-direction: column;
justify-content: space-between;
gap:10px;


}


/* text box container for the transfer */
.changeMe{
    height:50px;
    width:100%;
    border-radius: 5px;
    font-size: 40px;
    border:1px solid black;
padding: 0;
}
/* card transfer animation */
.cardsLoading{

    display:flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

}
.changebox{
    border-radius: 30px;
    height: 380px;
    width: 368px;
    background-color:whitesmoke;
    padding:18px 20px;
    display: flex;
    flex-direction: column;
}

.changebox .nameText{
    letter-spacing: 1px;
    font-size: 13px;
    color: #333;
}
/* .changebox .balance{

} */
.changebox .dollars{
    padding: 10px;
    text-align: center;
    font-size: 101px;
    font-weight: 900;
}
.changebox .pill{
    background-color: #fff;
    border-radius: 30px;
    padding: 10px 15px;
    display: inline-flex;
}
.changebox h2{
    font-size: 40px;
}
.changebox .pinner{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: auto;
}
.changebox-black{
    background-color: #2a4653;
    color:#fff;
    overflow: hidden;
    position: relative;
   
}
.changebox-black .balance p{
    color: #cabbbb;
}
.changebox-purple{
    background-color: #18301f;
    color:#fff;
    overflow: hidden;
    position: relative;
    
}
.changebox-purple .balance p{
    color: #cabbbb;

}


.loading-line {
    position: relative;
    width: 400px;
    height: 3px;
    background-color: #ddd;
    border-radius: 20px;
    overflow: hidden; /* Ensure the animation doesn't go outside */
}

.loading-line::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 0; /* Starts with zero width */
    background-color: #4CAF50; /* The color of the loading bar */
    border-radius: 20px;
    left:1px;
    animation: loading 2s infinite;
}

@keyframes loading {
    0% {
        width: 0; /* Starts with zero width */
    }
    50% {
        width: 100%; /* Expands to full width */
    }
    100% {
        width: 0; /* Resets back to zero */
    }
}

.line-container{
    text-align: center;
    position: relative;
    padding-top: 14%;
    padding-bottom: 14%;
}
/* .change-card{
  
} */
.btn-close{
    font-size: 24px;       /* Size of the "X" */
    font-weight: normal;     /* Make the "X" bold */
    color: #333;           /* Color of the "X" */
    border: none;          /* Remove border */
    background: none;      /* Remove background */
    cursor: pointer;       /* Show pointer on hover */
    padding: 0;            /* Remove padding */
    line-height: 1;        /* Adjust line height */
    position: absolute;    /* Positioning for modal or popups */
    top: 10px;             /* Positioning from the top */
    right: 10px;           /* Positioning from the right */
    background-color: none;
}

    `]

})


export class transferCardCompoonent{
    @Input() data: any;//input from the modalservice
  @Output() submit = new EventEmitter<void>(); 
  transferAmount: number| null = null;  // Amount to transfer



submitTransfer(){

}


}
