import { AfterViewInit, Component,ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { User } from '../models/user.model';
import { dummyManager } from '../models/dummyManager';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
@ViewChild(ModalFormComponent) modalComponent : ModalFormComponent | undefined;


constructor(private dummyService:dummyManager){};
currentUser!:User;

// ngAfterViewInit(): void {
  
// }

ngOnInit(): void {
  this.currentUser = this.dummyService.getCurrentUser();

  
}





}
