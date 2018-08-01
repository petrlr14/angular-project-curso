import { Injectable } from '@angular/core';

@Injectable()
export class UploadService{
    constructor(){
    }

    makeFileRequest(url:string, params:Array<string>, files:Array<File>, name:string ){/* name es el campo que recibe el backend en el json */
        console.log(url);
        return new Promise(function(resolve, reject){/* la promesa se resolvio */
            let formData:any=new FormData();
            let xhr=new XMLHttpRequest();/* archivo de peticiones asíncronas */

            for(let i=0; i<files.length; i++){
                formData.append(name, files[i], files[i].name);
            }
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}