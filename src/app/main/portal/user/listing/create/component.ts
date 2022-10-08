import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../service';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  templateUrl: 'template.html',
})

export class CreateDialogComponent implements OnInit{

  public form: FormGroup;
  public types:any[]          = []; 
  public suppliers:any;
  public branches:any;
  public isSaving:boolean = false;

  constructor(
    private _service: Service,
    private _snackBar: MatSnackBar, 
    public _dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
   //console.log(data); 
  //  this.types = data.types; 
  }
  
  ngOnInit(){
    this._buildForm();
    this._service.getBranch().subscribe(
      (res) => {
          this.branches = res;
      },
  ); 
  }


  save(){

    if(this.form.valid){
    
      this.isSaving = true; 
      this._service.create(this.form.value).subscribe( 
        // ========================>> HTTP Success Response 200
        (res: any) =>{ 
          
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
      this.form.markAllAsTouched(); 
      //console.log(this.form.value); 
      this._snackBar.open('Please check your input.', 'Message', {verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-snackbar']});
    }
   
   


  }

  private _buildForm() {

    this.form = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      phone: new FormControl('', [ Validators.required]),
      email: new FormControl('', [ Validators.required, Validators.max(100)]), 
      password : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      branch_id: new FormControl(0, [ Validators.required]),
      role_id: new FormControl('')
    });

}
srcChange($event, index:number = -1){
  this.form.get('image').setValue($event); 
}


}
