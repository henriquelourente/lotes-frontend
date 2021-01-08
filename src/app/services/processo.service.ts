import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Result } from "../models/result/result";
import { BaseService } from "./base.service";
import { LocalStorageService } from "./local-storage.service";
import { catchError, map } from "rxjs/operators";
import { Processo } from "../models/processo";

@Injectable()
export class ProcessoService extends BaseService {

    constructor(localStorageService: LocalStorageService, router: Router, private httpClient: HttpClient) {
        super(localStorageService, router);
    }
    public obterProcessosPorLinhaAreaUnidade(unidadeId: string, areaId: string, linhaId: string)
        : Observable<Result<Processo[]>> {
        const url = `${this.baseUrl}/processo?unidadeId=${unidadeId}&areaId=${areaId}&linhaId${linhaId}`;
        return this.httpClient
            .get<Result<Processo[]>>(url, this.obterHeaderAutenticadoJson())
            .pipe(
                map(response => response),
                catchError(this.serviceError));
    }
}