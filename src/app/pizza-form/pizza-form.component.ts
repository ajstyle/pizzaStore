import { Component, OnInit , Input , SimpleChanges, OnChanges } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {PizzaService} from '../services/pizza.service' ;
import { Observable } from 'rxjs';
import Swal from 'sweetalert2' ;

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.css']
})

export class PizzaFormComponent implements OnInit, OnChanges {
  @Input() selectedPizzaArray = [] ;
  @Input() total: number ;
  submitted = false ;
  pizzaForm: FormGroup ;
  toppings$: Observable<{ name: string; price: number; }[]>;
  showError: any ;
  selectedToppingVal: string ;
  toppingsValue = 0 ;  
  totalNew  ;
  minDate = new Date();

  ngOnChanges(changes: SimpleChanges): void {

    this.totalNew = changes.total.currentValue ;
  }
  constructor(private fb: FormBuilder , private service: PizzaService) {
    this.totalNew = this.total ; 

   }



get f() { return this.pizzaForm.controls; }

  ngOnInit() {
    this.pizzaForm =  this.createForm();
    this.toppings$ =  this.service.getPizzaToppings();
  }

  selectTopping() {
      const val = this.pizzaForm.get('toppings').value ;
      this.toppingsValue = val.price ;

      this.totalNew = this.total + this.toppingsValue ;

      // console.log(this.selectedToppingVal);
    // const toppingPrice = this.selectedToppingVal.split('  ') ;
    // console.log(toppingPrice);
    // this.total = this.total + parseInt(toppingPrice[1], 10) ;
    // console.log(this.total);
    }
  createForm() {
   return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      deliveryAddress : ['' , Validators.required ],
      toppings : ['', Validators.required],
      city : ['' , Validators.required] ,
      state : ['' , Validators.required],
      pinCode : ['' , Validators.required],
      deliveryDate : ['' , Validators.required] ,
      deliveryTime : ['', Validators.required ]
    });
  }

  dateChange(event) {
    console.log(event);
  }
  placeOrder() {
console.log(this.pizzaForm.value);

const obj = this.pizzaForm.value;
obj.selectedPizza = this.selectedPizzaArray ;
obj.total = this.totalNew ;
this.service.addPizza(obj).subscribe(x => {

  Swal.fire('Order Placed', '', 'success' ) ;


});
  }
}
