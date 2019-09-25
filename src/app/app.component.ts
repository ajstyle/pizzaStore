import { Component , OnInit , IterableDiffers } from '@angular/core';
import {PizzaService} from './services/pizza.service' ;
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] ,

})
export class AppComponent implements OnInit {
  title = 'pizza';
  pizzaValue = false ;
  pizzaMenu$: Observable<{name: string; price: number; }[]>;
  selectedPizzaArray = [];
  iterableDiffer: any ;
  totalPrice: number;
  constructor(private pizzaService: PizzaService , private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);

  }
  ngOnInit() {
     this.pizzaMenu$ = this.pizzaService.getPizzaDetail() ;
  }

  total() {
  
  }


  selectedPizza(pizza , index) {

    pizza.active = !pizza.active ;

    if (pizza.active) {
      this.selectedPizzaArray.push(pizza);
      this.iterableDiffer.diff(this.selectedPizzaArray);

    } else {
      console.log('index===', index);
      this.selectedPizzaArray =  this.selectedPizzaArray.filter(x => {
       if ( x === pizza) {
          return false ;
       }
       return true ;
     });
      this.iterableDiffer.diff(this.selectedPizzaArray);


    }

    console.log(this.selectedPizzaArray);
    this.totalPrice =   this.selectedPizzaArray.reduce( (a, b) => a + b.price , 0 );
    console.log(this.totalPrice);
  }
}




