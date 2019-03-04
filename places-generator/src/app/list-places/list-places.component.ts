import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import * as $ from 'jquery';
import * as domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


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





const PLACES: Place[] = [];
const PLACESBackup: Place[] = [];



@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.css']
})

export class ListPlacesComponent implements OnInit {
  places = PLACES;
  cnvs: any;
  thumbnailPreview: any;
  closeResult: string;
  lat = 9.934113;
  lng = -84.103834;
  zoom = 14;
  searchValue = '';
  facebookId = '';
  modalTitle = '';
  doneButtonTitle = '';
  thumbnailSrc = '';
  pictureUnoSrc = '';
  pictureDosSrc = '';
  pictureTresSrc = '';
  pictureCuatroSrc = '';
  thumbnailFile: File;
  pictureOneFile: File;
  pictureTwoFile: File;
  pictureThreeFile: File;
  pictureFourFile: File;
  countries = {};


  /*DATAS*/
  thumbnailData;
  pictureUnoData;
  pictureDosData;
  pictureTresData;
  pictureCuatroData;

  constructor(private modalService: NgbModal, private http: HttpClient) {}

  open(content) {
    this.modalTitle = 'Crear Place';
    this.doneButtonTitle = 'Guardar';
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

  public setThumbnail(event: any) {
    this.thumbnailPreview = document.getElementById('thumbnailPreview');

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.thumbnailSrc = reader.result;
      this.thumbnailFile = file;
      let node = document.getElementById('thumbnailPreview');

      domtoimage.toPng(node)
        .then(function(dataUrl) {
          console.log(dataUrl);
        })
        .catch(function(error) {
          console.error('oops, something went wrong!', error);
        });
    }
    reader.readAsDataURL(file);



  }

  public setPictureUno(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.pictureUnoSrc = reader.result;
      this.pictureOneFile = file;
    };
    reader.readAsDataURL(file);
  }

  public setPictureDos(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.pictureDosSrc = reader.result;
      this.pictureTwoFile = file;
    }
    reader.readAsDataURL(file);
  }

  public setPictureTres(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.pictureTresSrc = reader.result;
      this.pictureThreeFile = file;
    }
    reader.readAsDataURL(file);
  }

  public setPictureCuatro(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.pictureCuatroSrc = reader.result;
      this.pictureFourFile = file;
    }
    reader.readAsDataURL(file);
  }


  getAddressParts(object, id) {
    object.forEach(o => {
      if (o.types.length === 2) {
        if (o.types[0] === 'country' && o.types[1] === 'political') {
          this.countries[id] = o['formatted_address'];
        }
      }
    });
  }

  search($event) {
    const value = $event.target.value.toLowerCase();
    $('#places tr').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  }


  ngOnInit(): void {
    this.http.get('http://approach-server-env.pnne2aqzef.us-west-2.elasticbeanstalk.com/api/places').subscribe(data => {
      for (let i = 0; i < (<Place[]>data).length; i++) {
        PLACES.push(data[i]);
        PLACESBackup.push(data[i]);
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + data[i].lat + ',' + data[i].lng + '&sensor=false&key=AIzaSyBU5Z3JKq9QKZM2n8xGWs26PYqDHiyQ4F0').subscribe( data2 => {
          this.countries[data[i].id] = data2;
          this.getAddressParts(data2['results'], data[i].id);
        });
      }

    });


  }



}

