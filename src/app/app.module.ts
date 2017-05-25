import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Mapas
import { AgmCoreModule } from 'angular2-google-maps/core';

//servicios
import { HistorialProvider } from '../providers/historial/historial';

//plugins
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Contacts } from '@ionic-native/contacts';


import { MyApp } from './app.component';

import { MapaPage } from './../pages/mapa/mapa';


@NgModule({
  declarations: [
    MyApp,
    MapaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5OEFCzZBVx7H8HFahoWTOIkSRgfUG7WU'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapaPage
  ],
  providers: [
    Contacts,
    StatusBar,
    InAppBrowser,
    SplashScreen,
    BarcodeScanner,
    HistorialProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HistorialProvider
  ]
})
export class AppModule { }
