import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter'; 
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material';
import jsreport from '@jsreport/browser-client'
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
  public dataPrint:any;

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

  printingSale(){

    let params:any={}      
    if (this.from && this.to) {
      params.from = datepipe.transform(this.from, 'yyyy-MM-dd'),
      params.to = datepipe.transform(this.to, 'yyyy-MM-dd')
    }
    else {
      params.from = '',
      params.to = ''
    };

    this._service.printingSale(params).subscribe(res => {
      this.dataPrint = res;   
      jsreport["serverUrl"] = 'http://127.0.0.1:5488';
      jsreport.headers['Authorization'] = "Basic " + btoa('admin:123456');
      let request:any = {

        "data":JSON.stringify(this.dataPrint),
        "template": { "name":"sale-main" }
      }
      
      jsreport.render(request).then(function(res) {

      // open output in the new window
        res.openInWindow();
        res.download('myreport.pdf');
      }).catch(error => console.log(error));  
    
    })
  }
 
}
