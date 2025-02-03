import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ModalFormComponent } from "./modal-form/modal-form.component";

@Injectable({
    providedIn: 'root',
})
export class ModalService{
    private modalSubject = new Subject<boolean>();
    modalState$ = this.modalSubject.asObservable();
    private modalDataSubject = new Subject<any>();
    modalData$ = this.modalDataSubject.asObservable();
    private updatedDataSubject = new Subject<any>();
    updatedData$ = this.updatedDataSubject.asObservable();

    
    private modalComponent: any;

    constructor(){}
    registerModal(modal:ModalFormComponent){
        if(modal){
          
            console.log("ModalFormComponent registered:", modal);
        this.modalComponent = modal;
            
        }else{
            console.error("Failed to register ModalFormComponent!");
        }
        
    }
    
    openModal(data?:any):boolean{
        if (this.modalComponent) {
            this.modalDataSubject.next(data);
            console.log("ModalService: Opening modal");
            this.modalComponent.openModal(); // Call the modal's open method
            this.modalSubject.next(true);
            return true;
        } else {
            console.error("ModalService: ModalComponent is not registered!");
            return false;
        }
    }
    //close modal on button click or close button
    closeModal(){
        // this.modalSubject.next(false);
        console.log("closing modal");
    }

    sendModalData(data:any){
        this.updatedDataSubject.next(data);
        console.log("modal data max", data);
        
    }
}