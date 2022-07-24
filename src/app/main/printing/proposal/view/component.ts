import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Service } from '../service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';


@Component({
    templateUrl  : './template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../../printing.style.scss']
})
export class ViewComponent implements OnInit
{
    public data:any;
    public isLoading:boolean = false;
    public row:any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _service: Service,
        private router: ActivatedRoute, 
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
       
        // this.router.queryParams.subscribe(q=>{
            let code = this.router.snapshot.paramMap.get('code');
                this.isLoading = true;
                this._service.getProposal(code).subscribe( 
                    // =============================>> Response Success 200
                    res =>{
                      
                    
                      this.row = res;
                      this.isLoading = false;
                    
                    }, 
                    // =============================>> Response Error
                    err => {
                      //window.top.close();
                    }
              
                  );
        // });
    }

}

