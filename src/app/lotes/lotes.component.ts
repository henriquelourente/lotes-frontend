import { Component, OnInit } from '@angular/core';
import { Area } from '../models/area';
import { LoteFilter } from '../models/filter/lote-filter';
import { Linha } from '../models/linha';
import { Lote } from '../models/lote';
import { Processo } from '../models/processo';
import { LoteService } from '../services/lote.service';
import { UnidadeService } from '../services/unidade.service';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.css']
})
export class LotesComponent implements OnInit {

  unidadeId: string;

  areas: Area[];
  linhas: Linha[];
  processos: Processo[];
  lotes: Lote[]
  lotesPageIndex: number = 1;
  lotesCount: number = 0;
  lotesLoading: boolean = false;

  loteFilter: LoteFilter = null;

  constructor(
    private unidadeService: UnidadeService,
    private loteService: LoteService) { }

  ngOnInit(): void {
    this.carregarUnidadePadrao();
  }

  headerUnidadeEvent(unidadeId: string): void {
    this.unidadeId = unidadeId;
  }

  loteFilterEvent(loteFilter: LoteFilter): void {
    this.loteFilter = loteFilter;
    this.filtrarLotes();
  }

  private carregarUnidadePadrao(): void {
    this.unidadeService.obterUnidades()
      .subscribe(
        response => {
          this.unidadeId = response.content[0].id;
        },
        error => {
          console.log(error);
        });
  }

  filtrarLotes() {
    if (!this.validarFiltros()) {
      return;
    }

    this.lotesLoading = true;

    this.loteService.obterLotes(this.loteFilter, this.lotesPageIndex)
      .subscribe(
        response => {
          this.lotes = response.content.data;
          this.lotesCount = response.content.total;
          this.lotesLoading = false;
        },
        error => {
          this.lotesLoading = false;
          console.log(error);
        });
  }

  onQueryParamsChange(pageIndex: number): void {
    this.lotesPageIndex = pageIndex;
    this.filtrarLotes();
  }

  private validarFiltros(): boolean {
    return this.unidadeId != null
      && this.loteFilter.areaId != null
      && this.loteFilter.linhaId != null
      && this.loteFilter.processoId != null
      && this.loteFilter.dataInicial != null
      && this.loteFilter.dataFinal != null;
  }
}
