import { Injectable } from '@angular/core';
import {  of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PizzaService {


  constructor(public http : HttpClient ) { }
  url = 'https://pizzabackennd.herokuapp.com/api';

  pizzaMenu = [
    {
      name : 'BEEF & ONION' ,
      price : 10 ,
      imgUrl : '../../assets/images/beef.png',
      active : false 
    },
    {
      name : 'PEPPERONI' ,
      price : 15,
      imgUrl : '../../assets/images/pepperronni.png',
      active : false
  
    },
    {
      name : 'SPICY VEG TRIO' ,
      price : 5,
      imgUrl : '../../assets/images/spicyveg.png',
      active : false
  
    },
    {
      name : 'BBQ PORK & ONION' ,
      price : 15 ,
      imgUrl : '../../assets/images/bbqpork.png',
      active : false
  
    },
    {
      name : 'CHEESY GARLIC PIZZA' ,
      price : 10 ,
      imgUrl : '../../assets/images/cheesyGarlic.png',
      active : false
    }
  ];
  pizzaToppings =  [
  'Pepperoni',
  'Mushrooms',
  'Onions',
  'Sausage',
  'Bacon',
  'Extra cheese',
  'Black olives',
  'Green peppers',
  'Pineapple',
  'Spinach'
  ];
 
getPizzaDetail() {
 return  of(this.pizzaMenu);
}

getPizzaToppings() {
  return of(this.pizzaToppings)
}

addPizza(obj){
return this.http.post(`${this.url}/addPizza`, obj );
}

sendEmail(obj) {
console.log('obj====', obj);
return this.http.post(`${this.url}/emailReceipt`, obj );
}





}
