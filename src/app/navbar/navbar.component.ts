import { AfterViewInit, Component,ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit{
@ViewChild(ModalFormComponent) modalComponent : ModalFormComponent | undefined;


ngAfterViewInit(): void {
  
}





}
