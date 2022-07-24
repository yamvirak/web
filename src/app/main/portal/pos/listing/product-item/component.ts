// ===================================================================>> Core Library
import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

// ===================================================================>> Third Library


// ===================================================================>> Custom Library
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector:'product-item',
    templateUrl  : './template.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProductItemComponent implements OnInit
{
    
    @Input() data:any = null; //Get Data from Parent
    @Output() result = new EventEmitter;  //Send data to Parent

    constructor(

    ){}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void
    {
       
       
    }

    onOutput(){
        //console.log(this.data); 
        this.result.emit(this.data); 
    }



  
 

  
  

}

