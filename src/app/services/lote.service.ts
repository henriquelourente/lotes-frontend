import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { LocalStorageService } from "./local-storage.service";
import { catchError, map } from "rxjs/operators";
import { PaginatedResult } from "../models/result/paginated-result";
import { Lote } from "../models/lotes/lote";
import { LoteFilter } from "../models/filter/lote-filter";
import { ReavaliarLote } from "../models/lotes/reavaliar-lote";

@Injectable()
export class LoteService extends BaseService {

    constructor(localStorageService: LocalStorageService, router: Router, private httpClient: HttpClient) {
        super(localStorageService, router);
    }

    public obterLotes(loteFilter: LoteFilter, pagina: number)
        : Observable<PaginatedResult<Lote>> {
        const url =
            `${this.baseUrl}/lote?unidadeId=${loteFilter.unidadeId}&linhaId=${loteFilter.linhaId}&processoId=${loteFilter.processoId}&dataInicio=${loteFilter.dataInicial}&dataFim=${loteFilter.dataFinal}&tipoLoteId=&situacaoAberto=true&situacaoFechado=true&situacaoReavaliando=false&situacaoEncerradoManualmente=false&situacaoExcluido=false&areaId=${loteFilter.areaId}&equipamentoId=undefined&resultanteId=&ano=null&codigo=null&situacaoRejeitado=false&currentPage=${pagina}`;

        return this.httpClient
            .get<PaginatedResult<Lote>>(url, this.obterHeaderAutenticadoJson())
            .pipe(
                map(response => response),
                catchError(this.serviceError));
    }

    public reavaliar(reavaliarLote: ReavaliarLote): Observable<any> {
        return this.httpClient
            .put<any>(`${this.baseUrl}/lote/reavaliar`, reavaliarLote, this.obterHeaderAutenticadoJson())
            .pipe(
                map(response => response),
                catchError(this.serviceError));
    }
}