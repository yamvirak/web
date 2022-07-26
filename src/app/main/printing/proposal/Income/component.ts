import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Service } from '../service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';



@Component({
    templateUrl  : './template.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListingComponent implements OnInit
{
    
    public data:any;
    public isSearching:boolean = false;
    public row:any;
    public orderby:string='';

    public startDate:any;
    public endDate:any;
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
        console.log(code)
        this.isSearching = true;
        this.router.queryParams
        .subscribe(params => {
            console.log(params); // { orderby: "price" }

            this.startDate = params.from;
            this.endDate = params.to;

        }
        );
        this._service.incomeRecord(this.startDate, this.endDate).subscribe( 
    
            // =============================>> Response Success 200
            res =>{
              this.data = res;
              this.isSearching = false;
            
            }, 
            // =============================>> Response Error
            err => {
              //window.top.close();
            }
      
          );
// });
       
    }
    create():void {
    }
    
    totalRowUsd(details:any[] = []){
        let total:number = 0; 
        for(let i = 0; i < details.length; i++){
          if(details[i].usd_amount != ''){
            total+= parseInt(details[i].usd_amount); 
          }
          
        }
        return total; 
      }
      totalRowKh(details:any[] = []){
        let total:number = 0; 
        for(let i = 0; i < details.length; i++){
          if(details[i].usd_amount != ''){
            total+= parseInt(details[i].riel_amount); 
          }
          
        }
        return total; 
      }

}

