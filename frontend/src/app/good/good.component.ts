import { Component, OnInit } from '@angular/core';
import { OkService } from '../ok.service';
import {Car} from '../car';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.css']
})

export class GoodComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private okService: OkService) { }
  
  cars: Car[];
  car: Car;
  registered = false;
  submitted = false;
  carForm: FormGroup;

  invalidCarName()
  {
    return (this.submitted && this.carForm.controls.item.errors != null);
  }

  ngOnInit() {
     this.okService.deleteCar(10)
    .subscribe(data => this.getAllCars(), err => console.error(err) );

     this.carForm = this.formBuilder.group({
      item: ['', [Validators.required, Validators.maxLength(9)]],
    });
  }

  getAllCars() {
    this.okService.getAllCars()
    .subscribe(data => { 
    console.log(data); this.cars = data}, err => console.error(err))
  }
  
  deleteCar(arg) {
    this.cars = this.cars.filter(c => c.id !== arg);
    this.okService.deleteCar(arg)
    .subscribe(data =>{ this.car = null; this.registered = false; },  
    err => console.error(err) )
  }

  onSubmit()
  {
    this.submitted = true;

    if(this.carForm.invalid == true)
    {
      return;
    }
    else
    { 
      let car: Car = Object.assign({ id: this.cars.length }, this.carForm.value);
      
      this.okService.pushCar(car)
      .subscribe(data => { console.log(data); this.cars.push(car); }, 
      err => console.error(err)  
      )
      this.registered = true; 
      this.carForm.reset();
      this.submitted = false;

    }
  }

}
