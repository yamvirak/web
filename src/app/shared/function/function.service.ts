import { Injectable } from "@angular/core";
import { environment as env } from '../../../environments/environment';

@Injectable()
export class FunctionServices{
    
    //Convert string to json object
    jsonParse(str:string =""){
       
        if(str != null && str !=""){
            return JSON.parse(str);
        }
        return {};
    }
    //Convert boolean and vice sersa
    booleanParse(value:any){
        //console.log('Receive Value:', value);

        if(value === false || value === true){
            if(value){
                return 1;
            }else{
                return  0;
            }
        }
        
        if(value === 0 || value === 1 || value === '0' || value === '1'){
            if(value === 0 || value === '0' ){
                return  false;
            }else{
                return  true;
            }
        }
      
    }

    //To check if key in object; 
    isKeyInObject(obj, key){
        return Object.keys(obj).some(v => v == key);
    }

    isInt(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    }

    imgSrc(src){
        if(src){
            return env.fileUrl + src;
        }else{
            return env.fileUrl + src;
        } 
    }
    imgUrl(str){
        if(str){
            return env.fileUrl+ str;
        }else{
            return ''
        }
    }
    fileSrc(src){
        if(src){
            return env.fileUrl + src;
        }else{
            return env.fileUrl + src;
        } 
    }

    getFile(src){
        //apiUrl
        if(src){
            return env.apiUrl +'image?token='+ src;
        }else{
            return env.apiUrl +'image?token='+ src;
        } 
    }
  

    branchPrice(sellPrice:string = '', pv:string = ''){
        return  parseFloat(sellPrice)-parseFloat(pv)*0.04; 
    }

    storePrice(sellPrice:string = '', pv:string = ''){
        return  parseFloat(sellPrice)-parseFloat(pv)*0.02; 
    }
    
    

   
}
