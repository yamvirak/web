import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../service';

@Component({
  templateUrl: 'template.html',
})

export class EditDialogComponent implements OnInit{

  public form: FormGroup;
  public isSaving:boolean = false;
  public dataHasChanged:boolean = false; 
  public types:any[]          = []; 
  public suppliers:any;
  public branches:any;

  constructor(
    private _service: Service,
    private _snackBar: MatSnackBar, 
    public _dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
    // console.log(data); 
    // this.types = data.types; 
  }
  
  ngOnInit(){
    this._buildForm(); 
    this._service.getProductType().subscribe(
      (res) => {
          this.types = res;
      },
  ); 
  this._service.getSupplier().subscribe(
    (res) => {
        this.suppliers = res;
    },
); 
this._service.getBranch().subscribe(
  (res) => {
      this.branches = res;
  },
); 
  }


  save(){

    if(this.form.valid){
    
      this.isSaving = true; 
      this._service.update(this.data.row.id, this.form.value).subscribe( 
        // ========================>> HTTP Success Response 200
        (res: any) =>{ 
          
          this.dataHasChanged = true; 
          this.isSaving = false; 
          this._snackBar.open(res.message, 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
          this._dialogRef.close(res); 
        },  

        // ========================>> HTTP Error Response
        err => {  
          this.isSaving = false; 
          this._snackBar.open('Please try again.', 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']});
        }
      );
    }else{
      this._snackBar.open('Please check your input.', 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']});
    }
   
   


  }

  private _buildForm() {

    this.form = new FormGroup({
      name: new FormControl(this.data.row.name, [ Validators.required ]),
      unit_price: new FormControl(this.data.row.unit_price, [ Validators.required]),
      discount: new FormControl(this.data.row.discount, [ Validators.required, Validators.max(100)]), 
      type_id: new FormControl(this.data.row.type_id, [ Validators.required]),
      supplier_id: new FormControl(this.data.row.supplier_id, [ Validators.required]),
      branch_id: new FormControl(this.data.row.branch_id, [ Validators.required]),
      image: new FormControl('')
    });


  }

  srcChange($event, index:number = -1){
    this.form.get('image').setValue($event); 
  }


}
