import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { Service } from './service';

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './template.html',
    styleUrls    : ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectDashboardComponent implements OnInit
{
    public data:any       = null;

    /**
     * Constructor
     *
     */
    constructor(
        private _service: Service 
    )
    {
        

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     ngOnInit(): void
     {
        this.listing(); 
     }
 
     listing() {
         
         this._service.listing().subscribe(res => {
             
             this.data = res;
             
         })
        
     }

 
}

