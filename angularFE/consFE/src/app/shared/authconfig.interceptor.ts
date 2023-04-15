import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        if(authToken){

            if(req.url.startsWith('http://localhost:8888')){
                req = req.clone({
                    setHeaders: {
                        Authorization: authToken
                    }
                });
                
            }else{
               
            }
           
            
        }
        return next.handle(req); 
    }
}

