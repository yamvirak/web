import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Service as ServiceCls } from '../../my-profile';
import { MyProfileService as Service } from '../../my-profile.service';
import { Router } from '@angular/router';
@Component({
    // selector: 'service-list',
    selector: 'security',
    templateUrl: './security.component.html',   
})

export class SecurityComponent implements OnInit, AfterViewInit {


    data: any[] = [];

    /** end template for table column */

    constructor(
        private service: Service
    ) { }

    ngOnInit() {
     
    }

    ngAfterViewInit() {
    }
}


