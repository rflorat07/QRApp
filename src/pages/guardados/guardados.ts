import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HistorialProvider } from './../../providers/historial/historial';

import { ScanData } from './../../models/scan-data.model';

@IonicPage()
@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  historial: ScanData[] = [];

  constructor(private historialProvider: HistorialProvider) { }

  ionViewDidLoad() {
    this.historial = this.historialProvider.cargar_historial();
  }

  abrirScan(index: number) {
    this.historialProvider.abrir_scan(index);
  }

}
