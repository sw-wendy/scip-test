import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedReq = req.clone({
            setParams: { icode: environment.icode }
        });
        return next.handle(modifiedReq);
    }
}