import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { LocalStorageService } from "./local-storage.service";
import { catchError, map } from "rxjs/operators";
import { PaginatedResult } from "../models/result/paginated-result";
import { Lote } from "../models/lote";

@Injectable()
export class LoteService extends BaseService {

    constructor(localStorageService: LocalStorageService, router: Router, private httpClient: HttpClient) {
        super(localStorageService, router);
    }
    public obterLotes(unidadeId: string, areaId: string, linhaId: string, processoId: string, dataInicial: Date, dataFinal: Date, pagina: number)
        : Observable<PaginatedResult<Lote>> {
        const url =
            `${this.baseUrl}/lote?unidadeId=${unidadeId}&linhaId=${linhaId}&processoId=${processoId}&dataInicio=${dataInicial}&dataFim=${dataFinal}&tipoLoteId=&situacaoAberto=true&situacaoFechado=true&situacaoReavaliando=false&situacaoEncerradoManualmente=false&situacaoExcluido=false&areaId=${areaId}&equipamentoId=undefined&resultanteId=&ano=null&codigo=null&situacaoRejeitado=false&currentPage=${pagina}`;

        return this.httpClient
            .get<PaginatedResult<Lote>>(url, this.obterHeaderAutenticadoJson())
            .pipe(
                map(response => response),
                catchError(this.serviceError));
    }
}