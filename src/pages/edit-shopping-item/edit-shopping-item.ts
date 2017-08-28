import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database'
import {Subscription} from 'rxjs/Subscription'
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface'
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {
  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem: ShoppingItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase
  ) {
    // Capture the shoppingItemId as a NavParrameter
    const shoppingItemId = this.navParams.get('shoppingItemId');

    // Log shoppingIemId
    console.log(shoppingItemId);
    
    // Set the scope of our Firebase Object equal to our selected item
    this.shoppingItemRef$ = this.database.object(`shopping-List/${shoppingItemId}`);

    // Subscribe to the Object and assign the result to this.shoppingItem
    this.shoppingItemSubscription = this.shoppingItemRef$
        .subscribe( shoppingItem => this.shoppingItem = shoppingItem)
  }

  
  editeShoppingItem(shoppingItem: ShoppingItem){
    // Update our Firebase node with new item data
    this.shoppingItemRef$.update(shoppingItem);

    // Send the user back to the ShoppingListPage
    this.navCtrl.pop()
  }

  ionViewWillLeave(){
    // Unsubscrribe from the Observable when leaving the page
    this.shoppingItemSubscription.unsubscribe();
  }

}
