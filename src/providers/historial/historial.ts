import { Injectable } from '@angular/core';

import { ModalController, Platform, ToastController } from 'ionic-angular';

import { ScanData } from './../../models/scan-data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

import { MapaPage } from './../../pages/mapa/mapa';

@Injectable()
export class HistorialProvider {

  private _historial: ScanData[] = [];

  constructor(
    private platform: Platform,
    private iab: InAppBrowser,
    private contacts: Contacts,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) { }

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

      case "contacto":
        this.crear_contacto(scanData.info);
        break;

      case "email":

        // MATMSG:TO:rflorat07@gmail.com;SUB:Hola Mundo;BODY:Saludos Roger;;
        let htmlLink = scanData.info;

        htmlLink = htmlLink.replace("MATMSG:TO:", "mailto:");
        htmlLink = htmlLink.replace(";SUB:", "?subject=");
        htmlLink = htmlLink.replace(";BODY:", "&body=");
        htmlLink = htmlLink.replace(";;", "");
        htmlLink = htmlLink.replace(/ /g, "%20");

        console.log(htmlLink);

        this.iab.create(htmlLink, "_system");

        break;

      default:
        console.log("Tipo no soportado");
    }
  }

  cargar_historial() {
    return this._historial;
  }

  private crear_contacto(texto: string) {
    let campos: any = this.parse_vcard(texto);
    let nombre = campos['fn'];
    let tel = campos.tel[0].value[0];

    if (!this.platform.is('cordova')) {
      console.warn("Estoy en la computadora, no puedo crear contacto.");
      return;
    }

    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', tel)];

    contact.save().then(
      () => this.crear_toast("Contacto " + nombre + " creado"),
      (error) => this.crear_toast("Error: " + error)
    );

  }

  private crear_toast(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    }).present();
  }

  private parse_vcard(input: string) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
      var results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        var meta = {};
        results[2].split(';')
          .map(function (p, i) {
            var match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ["TYPE" + (i === 0 ? "" : i), p];
            }
          })
          .forEach(function (p) {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    });

    return fields;
  };


}
