import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OkService }  from '../ok.service';

@Component({
  selector: 'app-good-detail',
  templateUrl: './good-detail.component.html',
  styleUrls: ['./good-detail.component.css']
})

export class GoodDetailComponent implements OnInit {
  
  id: number = +this.route.snapshot.paramMap.get('id');
  car: Car;
  registered: boolean = false;
  submitted: boolean = false;
  carForm: FormGroup;
  
  del: boolean = false;
  message: string = '';
  
  invalidCarName()
  {
    return (this.submitted && this.carForm.controls.item.errors != null);
  }

  constructor(
  private formBuilder: FormBuilder, 
  private route: ActivatedRoute,
  private okService: OkService,
  private router: Router
  ) { }

  ngOnInit(): void {
  this.getCar();
  this.carForm = this.formBuilder.group({
      item: ['', [Validators.required, Validators.maxLength(9)]],
    });
  }

  getCar(): void {
  
    this.okService.getCar(this.id)
    .subscribe(car => this.car = car, err => console.error(err));
  } 
  

  deleteCar() {
    
    this.okService.deleteCar(this.id)
    .subscribe(data => {this.car = null;  this.del = true; this.message='deleted';
      setTimeout(() => {this.router.navigate(['good']);}, 1000);
    }, err => console.error(err) )
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
      let car: Car = Object.assign({ id: this.id }, this.carForm.value);
      console.log(car);
      
      this.okService.updateCar(car)
      .subscribe(data =>  {
        this.okService.getCar(this.id)
          .subscribe(car => { this.car = car; this.message = 'updated';}, 
           err => console.error(err)
          );
      } )
      
      this.registered = true;
      this.carForm.reset();
      this.submitted = false;

    }
  }

}
