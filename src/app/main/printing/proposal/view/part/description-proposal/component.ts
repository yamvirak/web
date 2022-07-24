import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

//=========================================================>> Custom Library
import { FuseConfigService } from '@fuse/services/config.service';


@Component({
    selector: 'description-proposal',
    styleUrls: ['./style.scss'],
    templateUrl  : './template.html',
    encapsulation: ViewEncapsulation.None,

})
export class DescriptionProposal implements OnInit
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

