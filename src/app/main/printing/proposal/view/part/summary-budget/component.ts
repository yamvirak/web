import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

//=========================================================>> Custom Library
import { FuseConfigService } from '@fuse/services/config.service';


@Component({
    selector: 'summary-budget',
    styleUrls: ['./style.scss'],
    templateUrl  : './template.html',
    encapsulation: ViewEncapsulation.None,

})
export class SummaryBudget implements OnInit
{
    @Input() data;
    constructor(
        private _fuseConfigService: FuseConfigService,
    ){
    }

    ngOnInit(): void
    {
       
    }

}

