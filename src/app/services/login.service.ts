import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from "../models/usuario";
import { Observable, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { BaseService } from "./base.service";

@Injectable()
export class LoginService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    login(usuario: Usuario): Observable<any> {
        const response = this.httpClient
            .post('http://localhost:8081/api/login', usuario, this.ObterHeaderJson())
            .pipe(
                map(response => response),
                catchError(this.serviceError));

        return response;
    }

    protected serviceError(response: Response | any) {
        return throwError(response);
    }
}