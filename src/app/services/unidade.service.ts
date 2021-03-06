import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Result } from "../models/result/result";
import { Unidade } from "../models/unidade";
import { BaseService } from "./base.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class UnidadeService extends BaseService {

    constructor(localStorageService: LocalStorageService, router: Router, private httpClient: HttpClient) {
        super(localStorageService, router);
    }

    public obterUnidades(): Observable<Result<Unidade[]>> {
        const response = this.httpClient
            .get<Result<Unidade[]>>(`${this.baseUrl}/unidade/buscar-todas-unidades`, this.obterHeaderAutenticadoJson())
            .pipe(
                map(response => response),
                catchError(this.serviceError));

        return response;
    }
}