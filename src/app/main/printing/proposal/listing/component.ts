import { Component, OnInit, ViewEncapsulation } from '@angular/core';

//=========================================================>> Custom Library
import { FuseConfigService } from '@fuse/services/config.service';


@Component({
    templateUrl  : './template.html',
    styleUrls: ['../../../../../assets/custom.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListingComponent implements OnInit
{
    
    public code:string = '209334';
    public type:number = 0; 

    constructor(
        private _fuseConfigService: FuseConfigService,
    ){
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void
    {
        console.log('Hello List');
        
       
    }


    create():void {

    }

}

