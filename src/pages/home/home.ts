import { Component } from '@angular/core';
import { IonicPage, ToastController, Platform } from 'ionic-angular';

//Plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//Servicios
import { HistorialProvider } from './../../providers/historial/historial';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform,
    private historialProvider: HistorialProvider) {
  }

  scan() {

    console.log("Realizando scan...");

    if (!this.platform.is('cordova')) {
      // this.historialProvider.agregar_historial("http://google.com");
      // this.historialProvider.agregar_historial("geo:45.6817659,8.7877235");

      /* this.historialProvider.agregar_historial(`BEGIN:VCARD
         VERSION:2.1
         N:Kent;Clark
         FN:Clark Kent
         ORG:
         TEL;HOME;VOICE:12345
         TEL;TYPE=cell:67890
         ADR;TYPE=work:;;;
         EMAIL:clark@superman.com
         END:VCARD` ); */

      this.historialProvider.agregar_historial("MATMSG:TO:rflorat07@gmail.com;SUB:Hola Mundo;BODY:Saludos Roger;;");


      return;
    }

    this.barcodeScanner.scan().then((barcodeData: any) => {
      // Success! Barcode data is here
      console.log("Result: " + barcodeData.text);
      console.log("Format: " + barcodeData.format);
      console.log("Cancelled: " + barcodeData.cancelled);

      if (barcodeData.cancelled == 0 && barcodeData.text != null) {
        this.historialProvider.agregar_historial(barcodeData.text);
      }

    }, (err) => {
      // An error occurred
      console.log("Error: ", err);
      this.mostrarError('Error: ' + err);
    });
  }

  mostrarError(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    })

    toast.present();
  }

}
