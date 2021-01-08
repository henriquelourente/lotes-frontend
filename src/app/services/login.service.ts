import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../models/usuario";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { BaseService } from "./base.service";
import { LocalStorageService } from "./local-storage.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginService extends BaseService {

    constructor(localStorageService: LocalStorageService, router: Router, private httpClient: HttpClient) {
        super(localStorageService, router);
    }

    login(usuario: Usuario): Observable<any> {
        const response = this.httpClient
            .post('http://localhost:8081/api/login', usuario, this.obterHeaderJson())
            .pipe(
                map(response => response),
                catchError(this.serviceError));

        return response;
    }
}