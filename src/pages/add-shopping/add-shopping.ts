import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface'
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {
  shoppingItem = {} as ShoppingItem;
  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase
  ) {
    this.shoppingItemRef$ = this.database.list('shopping-List');
    /*
      shopping-List:
        0:
          itemName: 'Pizza',
          itemNumber: 1
        1: 
          itemName: 'Cheesecake',
          itemNumber: 4
    */
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    /*
      Create a new anonymous obj and convert itemsNumber to a number
      Push this to our Firebase database under the 'shopping-List' node
    */
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    // Reset our ShoppingItem
    this.shoppingItem = {} as ShoppingItem;

    // Navigate the user back to the ShoppingListPage
    this.navCtrl.pop();
  }

}
