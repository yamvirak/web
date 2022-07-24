import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


/**
 * @title Autocomplete overview
 */
@Component({
  selector: 'data-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class FormAutoCompleteComponent implements OnInit{
  

 

  @Input() data: any[] = [];
  @Input() selected: number = 0; 
  @Input() icon: string = 'language'; 
  @Input() placeholder: string = 'language'; 


  ctrl = new FormControl(null, [Validators.required]);
  filteredData: Observable<any[]>;

  constructor() {
    
    
  }

  ngOnInit(){

    this.filteredData = this.ctrl.valueChanges
    .pipe(
      startWith(''),
      map(str => { 
        return str ? this._filterData(str) : this.data.slice() 
      })
    );

    

    this.data.forEach(res =>{
      if( parseInt(res.id) == this.selected){
        
        this.ctrl.setValue(res); 
       
      }
    })

   
  }

  private _filterData(str: string): any[] {
    return this.data.filter(row => { 
      return row.kh_name.indexOf(str) >= 0; 

    });
  }

  blur(e){
    let valid = false;
   this.data.forEach(el => {
     if(el == this.ctrl.value){
       valid = true;
     }
   })

   if(!valid){
    this.ctrl.setValue(null); 
   }
  }

  select($event){
    //this.selectedObj = $event.option.value; 
    
  }

  close($event){
   
  }

  displayFn(option){
    return  option  ? option.kh_name : '';  
  }

  checkValidation(){

    let x = this.ctrl.markAsTouched(); 
    
    // (<any>Object).values(this.ctrl).forEach(control => {
    //   control.markAsTouched();
    // });


    return this.ctrl.valid; 
  }

}
