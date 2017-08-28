import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AddShoppingPage } from '../add-shopping/add-shopping';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item'
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController
  ) {
    /* Pointing shoppingListRef$ at Firebase -> 'shopping-list' node.
       That means not only can we push things from this reference to
       the database, but also we have access to everything inside of 
       that node.
    */
    this.shoppingListRef$ = this.database.list('shopping-List')
  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    /* Display an ActionSheet that gives the user the following
    option:
      1. Edit the ShoppingItem
      2. Delele the ShoppingItem
      3. Cancel selection
    */
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            /* Send the user to the EditShoppingIempage and pass the key
            as a parnmeter */
            this.navCtrl.push(EditShoppingItemPage, 
              { shoppingItemId: shoppingItem.$key});
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // Delete the current ShoppingItem
            this.shoppingListRef$.remove(shoppingItem.$key)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // Cancel
            console.log(shoppingItem)
            console.log('The user has select the cancel btn')
          }
        }

      ]
    }).present();
  }

  navigateToAddShopingPage() {
    // Navigate user to AddShopingPage
    this.navCtrl.push(AddShoppingPage)
  }
}
