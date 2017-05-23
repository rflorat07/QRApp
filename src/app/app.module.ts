import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//servicios
import { HistorialProvider } from '../providers/historial/historial';

//plugins
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    InAppBrowser,
    SplashScreen,
    BarcodeScanner,
    HistorialProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialProvider
  ]
})
export class AppModule {}
