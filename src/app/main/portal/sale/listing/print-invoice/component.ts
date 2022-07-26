import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter'; 
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material';

import { environment as env} from 'environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../service';
const datepipe: DatePipe = new DatePipe('en-US')
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  templateUrl: 'template.html',
  providers: [ 
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}, 
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}, 
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}, 
  ],
})
export class PrintInvoiceComponent implements OnInit{


  public from:any;
  public to:any;
  public isSaving:boolean = false;
  public dataHasChanged:boolean = false; 
  public isSearching:boolean  = false; 

  constructor(
    private _service: Service,
    private _snackBar: MatSnackBar, 
    public _dialogRef: MatDialogRef<PrintInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
  
  }
  
  ngOnInit(){
  // console.log(this.data)
  }

  printInvoice(id:string = ''){
    let token = localStorage.getItem("temp-token");
    let w = window.open("about:blank");
    let startDate = datepipe.transform(this.from, 'yyyy-MM-dd') ;
    let endDate =datepipe.transform(this.to, 'yyy-MM-dd');
    //window.open(env.apiUrl+"/cp/sales/report/?from="+startDate+'&to='+endDate+ token);
    w.document.body.appendChild(w.document.createElement("iframe")).src =
    env.apiUrl + "/cp/sales/report/?from="+startDate+'&to='+endDate + "&token=" + token;
    w.document.getElementsByTagName("iframe")[0].style.width = "100%";
    w.document.getElementsByTagName("iframe")[0].style.height = "100%";
     w.focus();
  }
 
}
