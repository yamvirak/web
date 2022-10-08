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
    this._service.getBranch().subscribe(
      (res) => {
          this.branches = res;
      },
  ); 
  }


  save(){

    if(this.form.valid){
    
      this.isSaving = true; 
      this._service.update(this.data.id, this.form.value).subscribe( 
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
      name: new FormControl(this.data.name, [ Validators.required ]),
      phone: new FormControl(this.data.phone, [ Validators.required]),
      email: new FormControl(this.data.email, [ Validators.required, Validators.max(100)]), 
      branch_id: new FormControl(this.data.admin.branches[0].branch_id, [ Validators.required]),
      role_id: new FormControl(this.data.admin.branches[0].role_id, [ Validators.required]),
    });


  }

  srcChange($event, index:number = -1){
    this.form.get('image').setValue($event); 
  }


}
