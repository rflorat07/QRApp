
import { Injectable } from '@angular/core';

import { ModalController } from 'ionic-angular';

import { ScanData } from './../../models/scan-data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MapaPage } from './../../pages/mapa/mapa';

@Injectable()
export class HistorialProvider {

  private _historial: ScanData[] = [];

  constructor(private iab: InAppBrowser, private modalCtrl: ModalController) { }

  agregar_historial(texto: string) {
    let data = new ScanData(texto);
    this._historial.unshift(data);
    console.log(this._historial);
    this.abrir_scan(0);
  }

  abrir_scan(index: number) {
    let scanData = this._historial[index];
    switch (scanData.tipo) {
      case "http":
        this.iab.create(scanData.info, "_system");
        break;

      case "mapa":
        this.modalCtrl.create(MapaPage, { coords: scanData.info }).present();
        break;

      default:
        console.log("Tipo no soportado");
    }
  }

  cargar_historial() {
    return this._historial;
  }


}
