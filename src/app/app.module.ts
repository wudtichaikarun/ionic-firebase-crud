import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// Import angularfire2
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { FIREBASE_CREDENTAILS } from './firebase.credentails'

import { MyApp } from './app.component';
// New component
import { ShoppingListPage } from '../pages/shopping-list/shopping-list'
import { AddShoppingPage } from '../pages/add-shopping/add-shopping'




@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // Initialise angularfire with credentails from the dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTAILS),
    // Import the AngularFireDatabaseModule to use database interaction
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
