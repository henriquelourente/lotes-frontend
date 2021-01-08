import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Linha } from "../models/linha";
import { Result } from "../models/result/result";
import { BaseService } from "./base.service";
import { LocalStorageService } from "./local-storage.service";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class LinhaAreaService extends BaseService {

    constructor(localStorageService: LocalStorageService, router: Router, private httpClient: HttpClient) {
        super(localStorageService, router);
    }

    public obterLinhasPorArea(areaId: string): Observable<Result<Linha[]>> {
        return this.httpClient
            .get<Result<Linha[]>>(`${this.baseUrl}/linha/linha-area?areaId=${areaId}`, this.obterHeaderAutenticadoJson())
            .pipe(
                map(response => response),
                catchError(this.serviceError));
    }
}