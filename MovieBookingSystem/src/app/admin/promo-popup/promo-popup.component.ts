import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-promo-popup',
  templateUrl: './promo-popup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./promo-popup.component.scss']
})
export class PromoPopupComponent implements OnInit {
  @ViewChild('promoPopupModal') myModal: any;
  modalOptions:NgbModalOptions;
  private modalConfig: NgbModalOptions = {
    backdrop: 'static',
    keyboard: true,
    
  };

  constructor(private modalService: NgbModal) { 
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      centered:true,
      size:'sm',
      keyboard:true,
      scrollable:false,
      windowClass: 'promoPopup'
    }
  }

  ngOnInit(): void {
    this.openModal();
  }

  openModal(){
    this.modalService.open(this.myModal);
  }

  closeModal(){
    this.modalService.dismissAll();
  }

}
