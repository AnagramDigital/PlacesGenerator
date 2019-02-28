import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';
import {d} from '@angular/core/src/render3';



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

let PLACES: Place[] = [];



@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.css']
})

export class ListPlacesComponent implements OnInit{
  places = PLACES;
  closeResult: string;
  lat = 9.934113;
  lng = -84.103834;
  zoom = 14;
  facebookId = ''
  constructor(private modalService: NgbModal, private http: HttpClient) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  placeMarker($event) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
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

  ngOnInit(): void {
    this.http.get('http://approach-server-env.pnne2aqzef.us-west-2.elasticbeanstalk.com/api/places').subscribe(data => {
      for(let i = 0; i < parseInt(data.length); i++){
        PLACES.push(data[i]);
      }
    });
  }



}
