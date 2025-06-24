import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rideTracker } from '../models/rideTracker..model';
import { Card } from '../models/cards.model';
import { dummyManager } from '../models/dummyManager';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  serialNumber:string| null = null;
  cardType:string | null = null;
  allRide: any[] = [];
  cards:Card[]=[]


constructor(private route:ActivatedRoute,private dummyService:dummyManager){}
  ngOnInit(): void {
//     this.serialNumber =this.route.snapshot.paramMap.get('serialNumber');
//     this.cardType=this.route.snapshot.paramMap.get('cardType');
// if(this.serialNumber !== null){
//   const serialNumberInt = parseInt(this.serialNumber, 10);
//   this.cards = this.dummyService.getCards(serialNumberInt);
// }
//    console.log("card info",this.cards[0].cardname);
      
  }
  // dummyCards:Card[] =[


  //   new Card(23839234,30,false,new Date('2024-12-31'),"Student","Allison Sweeney",true),
  //   new Card(38992939,35,true,new Date('2024-12-31'),"Default","Lisa Tepes",true),
  //   new Card(68992939,35,true,new Date('2024-12-31'),"Default","Jason Miller",true),
  //   new Card(48992939,35,true,new Date('2024-12-31'),"Custom","Charlie Thompson",true),
    
    
    
  //   ];

}
