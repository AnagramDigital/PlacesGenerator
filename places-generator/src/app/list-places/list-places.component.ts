import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import * as $ from 'jquery';
import * as domtoimage from 'dom-to-image';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';



class Place {
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
  thumbnailPreview: any;
  closeResult: string;
  lat = 9.934113;
  lng = -84.103834;
  zoom = 14;
  searchValue = '';
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
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  id;
  Dataname = '';
  DatalocalType = '';
  Datafacebook = '';
  Datatwitter = '';
  DataInstagram = '';
  DataAbout = '';
  DataTel = '';
  DataLat = '';
  DataLng = '';
  urls = [];



  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  db: AngularFireDatabase;
  constructor(private modalService: NgbModal, private http: HttpClient, private afStorage: AngularFireStorage, db: AngularFireDatabase) {
    this.db = db;
    this.itemRef = db.object('PlacePics');
    this.item = this.itemRef.valueChanges();
  }

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
    let self = this;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.thumbnailSrc = reader.result;
      let node = document.getElementById('thumbnailPreview');
      domtoimage.toPng(node)
        .then(function(dataUrl) {
          console.log(dataUrl);
          var block = dataUrl.split(";");
          var contentType = block[0].split(":")[1];
          var realData = block[1].split(",")[1];
          var block = dataUrl.split(";");
          var contentType = block[0].split(":")[1];
          var realData = block[1].split(",")[1];
          self.thumbnailFile = new File([self.b64toBlob(realData, contentType,512)], 'Thumbnail.png', {type: 'image/png'});
        })
        .catch(function(error) {
          console.error('oops, something went wrong!', error);
        });
    }
    reader.readAsDataURL(file);
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
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
    $('#places tr').filter(function(): any {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  }

  upload(file, id, nombre) {
    this.ref = this.afStorage.ref('PlacePics/' + id + '/' + nombre);
    this.task = this.ref.put(file);
    this.task.then(a => {
      let ref = task;
      let downloadURL = ref.subscribe(url =>{
        console.log('new url: ' + url);
        if(nombre === 'Thumbnail'){
          this.updateThumbnail(url);
        }
        this.setDatabaseReference(id, nombre, url);
        console.log('ID: ', id, 'Nombre: ', nombre, 'Url', url)
      });
    });
    this.modalService.dismissAll();
  }

  setDatabaseReference(id, nombre, url) {
    this.itemRef = this.db.object('PlacePics/' + id);
    this.itemRef.update({[nombre]: url});
  }

  updateThumbnail(url){
    let place: Place = new Place();
    place.id = this.id;
    place.name = this.Dataname;
    place.localType = this.DatalocalType;
    place.facebook = this.Datafacebook;
    place.twitter = this.Datatwitter;
    place.instagram = this.DataInstagram;
    place.about = this.DataAbout;
    place.tel = this.DataTel;
    place.lat = this.lat;
    place.lng = this.lng;
    place.review = 5;
    place.currentlyInPlace = 0;
    place.willAttendToday = 0;
    place.imageUrl = url;
    console.log(place);
    this.http.put('http://approach-server-env.pnne2aqzef.us-west-2.elasticbeanstalk.com/api/places', place).subscribe(
      response => {
        console.log('DB Actualizada: ', response);
      }
    );
  }

  save() {
    let place: Place = new Place();
    place.name = this.Dataname;
    place.localType = this.DatalocalType;
    place.facebook = this.Datafacebook;
    place.twitter = this.Datatwitter;
    place.instagram = this.DataInstagram;
    place.about = this.DataAbout;
    place.tel = this.DataTel;
    place.lat = this.lat;
    place.lng = this.lng;
    place.review = 5;
    place.currentlyInPlace = 0;
    place.willAttendToday = 0;
    console.log(place);
    this.http.post('http://approach-server-env.pnne2aqzef.us-west-2.elasticbeanstalk.com/api/places', place).subscribe(
      response => {
        this.id = (<Place>response).id;
        this.upload(this.thumbnailFile, (<Place>response).id, 'Thumbnail');
        if (this.pictureOneFile) {
          this.upload(this.pictureOneFile, (<Place>response).id, 'Picture1');
        }
        if (this.pictureTwoFile) {
          this.upload(this.pictureTwoFile, (<Place>response).id, 'Picture2');
        }
        if (this.pictureThreeFile) {
          this.upload(this.pictureThreeFile, (<Place>response).id, 'Picture3');
        }
        if (this.pictureFourFile) {
          this.upload(this.pictureFourFile, (<Place>response).id, 'Picture4');
        }
      }
    );

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

