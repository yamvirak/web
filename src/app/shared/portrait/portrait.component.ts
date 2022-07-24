import { Component, OnInit, Input, Inject , EventEmitter, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.scss']
})
export class PortraitComponent implements OnInit{
  
  @Input() src: string = 'assets/mpwt/person-placeholder.jpg';
  @Input() index: string = '';
  @Input() title: string = 'ផ្ទុកឯកសារ​';
  @Input() mode: string = 'READONLY';
  @Output() srcChange = new EventEmitter();
  
  
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    // trigger if datasource is changed then tell mateDataSource
   
  }

  ngAfterViewInit(): void {
  
  }

  ngOnChanges(): void {
   
  }


    
  fileChangeEvent(event: any): void {
   
    
    const dialogRef = this.dialog.open(PortraitDialogComponent, {
      width: '600px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result != ''){
        this.src = result; 
        this.srcChange.emit(result);
      }

    });
  }


  selectFile(){
    if(this.mode != "READONLY"){
      document.getElementById('portrait-file-'+this.index).click(); 
    }
    
  }



}

  



// ===================================================================>> Dialog
@Component({

  templateUrl: 'portrait.dialog.component.html',
  styleUrls: ['./portrait.component.scss']
})
export class PortraitDialogComponent {

  result = ""; 
  constructor(
    public dialogRef: MatDialogRef<PortraitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.imageChangedEvent = data;
    }

  close(): void {
    this.dialogRef.close('');
  }

  imageChangedEvent: any = '';
  imageCropped(event: ImageCroppedEvent) {
    this.result = event.base64 ? event.base64 : ''; 
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

}

