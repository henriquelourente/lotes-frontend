import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Area } from "../models/area";
import { Result } from "../models/result/result";
import { BaseService } from "./base.service";
import { LocalStorageService } from "./local-storage.service";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class AreaService extends BaseService {

    constructor(localStorageService: LocalStorageService, router: Router, private httpClient: HttpClient) {
        super(localStorageService, router);
    }

    public obterAreasPorUnidade(unidadeId: string): Observable<Result<Area[]>> {
        return this.httpClient
            .get<Result<Area[]>>(`${this.baseUrl}/area?unidadeId=${unidadeId}`, this.obterHeaderAutenticadoJson())
            .pipe(
                map(response => response),
                catchError(this.serviceError));
    }
}