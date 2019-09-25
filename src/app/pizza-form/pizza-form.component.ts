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

export class PizzaFormComponent implements OnInit {
  @Input() selectedPizzaArray = [] ;
  @Input() total: number ;
  submitted = false ;
  pizzaForm: FormGroup ;
  toppings$: Observable<Array<string>>;
  showError: any ;
  constructor(private fb: FormBuilder , private service: PizzaService) { }



get f() { return this.pizzaForm.controls; }

  ngOnInit() {
    this.pizzaForm =  this.createForm();
    this.toppings$ =  this.service.getPizzaToppings();
  }

  selectedToppings() {

  }
  createForm() {
   return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      deliveryAddress : ['' , Validators.required ],
      deliveryDateTime : ['' , Validators.required] ,
    });
  }

  placeOrder(){
console.log(this.pizzaForm.value);

const obj = this.pizzaForm.value; 
obj.selectedPizza = this.selectedPizzaArray ;
this.service.addPizza(obj).subscribe(x => {

  Swal.fire('Order Placed', '', 'success' ) ;


});
  }
}
