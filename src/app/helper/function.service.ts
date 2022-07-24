import { Injectable } from "@angular/core";
import { environment as env } from '../../environments/environment';
@Injectable()
export class FunctionService{
    
    checkPermission(permission){

        return true; 
        // let permissions = localStorage.getItem('permissions');
        // if(permissions){
        //     let decPassword = 'U821I@()';
        //     permissions  = CryptoJS.AES.decrypt(permissions.trim(), decPassword.trim()).toString(CryptoJS.enc.Utf8);
        //     const  array_permissions = JSON.parse(permissions);
    
        //     for (var i = 0; i < array_permissions.length; i++) {
        //         if (array_permissions[i].slug == permission ) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }else{
        //     return false;
        // }
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

    fullFileSrc(str){
        if(str){
            return str;
        }else{
            return ''
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
  
    getRole(){
        let role = '';
        role = localStorage.getItem('role') ?  localStorage.getItem('role') : '';
        return role;
    }

    getUserName(){
        let name = '';
        name = localStorage.getItem('name') ?  localStorage.getItem('name') : '';
        return name;
    }

    getAvatar(){
        let avatar = '';
        avatar = localStorage.getItem('avatar') ?  localStorage.getItem('avatar') : '';
        return avatar;
    }

    getDistributor(){
        let role = '';
        role = localStorage.getItem('role') ?  localStorage.getItem('role') : '';
        return role;
    }

    

   
}
