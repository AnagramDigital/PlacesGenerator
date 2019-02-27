import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



interface Place {
  id: number;
  name: string;
  localType: string;
  review: number;
  facebook: string;
  twitter: string;
  instagram: string;
  about: string;
  lat: number;
  lng: number;
  tel: string;
  imageUrl: string;
  currentlyInPlace: number;
  willAttendToday: number;
}

const PLACES: Place[] = [
  {
    id: 0,
    name: 'La concha de la lora',
    localType: 'Bar',
    review: 5,
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    instagram: 'https://www.instagram.com',
    about: 'No conozco este bar',
    lat: 5,
    lng: 5,
    tel: '88080808',
    imageUrl: 'https://www.google.com',
    currentlyInPlace: 5,
    willAttendToday: 5
  },
  {
    id: 1,
    name: 'La concha de la lora',
    localType: 'Bar',
    review: 5,
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    instagram: 'https://www.instagram.com',
    about: 'No conozco este bar',
    lat: 5,
    lng: 5,
    tel: '88080808',
    imageUrl: 'https://www.google.com',
    currentlyInPlace: 5,
    willAttendToday: 5
  },
  {
    id: 2,
    name: 'La concha de la lora',
    localType: 'Bar',
    review: 5,
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    instagram: 'https://www.instagram.com',
    about: 'No conozco este bar',
    lat: 5,
    lng: 5,
    tel: '88080808',
    imageUrl: 'https://www.google.com',
    currentlyInPlace: 5,
    willAttendToday: 5
  }

];

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.css']
})

export class ListPlacesComponent{
  places = PLACES;
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



}
