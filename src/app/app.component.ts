import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardComponent } from './card/card.component';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { ModalService } from './modal.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SidebarComponent,CardComponent,ModalFormComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isModalOpen = false;
  modalData:any;
  title = 'my-omny';
  constructor(private modalService: ModalService){}
  ngOnInit() {
    this.modalService.modalState$.subscribe(isOpen => {
      this.isModalOpen = isOpen;
    })

    this.modalService.modalData$.subscribe(data =>{
      this.modalData = data;
    })
    
  }
}
