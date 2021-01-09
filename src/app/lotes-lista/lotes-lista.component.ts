import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Area } from '../models/area';
import { LoteFilter } from '../models/filter/lote-filter';
import { Linha } from '../models/linha';
import { Lote } from '../models/lote';
import { Processo } from '../models/processo';
import { LoteService } from '../services/lote.service';
import { UnidadeService } from '../services/unidade.service';

@Component({
  selector: 'app-lotes-lista',
  templateUrl: './lotes-lista.component.html',
  styleUrls: ['./lotes-lista.component.css']
})
export class LotesListaComponent implements OnInit {

  filtroLotesForm: FormGroup;

  unidadeId: string;

  areas: Area[];
  linhas: Linha[];
  processos: Processo[];
  lotes: Lote[]
  lotesPageIndex: number = 1;
  lotesPageSize: number = 21;
  lotesCount: number = 0;
  lotesLoading: boolean = false;

  loteFilter: LoteFilter;

  constructor(
    private unidadeService: UnidadeService,
    private loteService: LoteService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filtroLotesForm = new FormGroup({
      unidadeId: this.formBuilder.control('', Validators.required),
      areaId: this.formBuilder.control('', Validators.required),
      linhaId: this.formBuilder.control('', Validators.required),
      processoId: this.formBuilder.control('', Validators.required),
      dataInicial: this.formBuilder.control(Date.now(), Validators.required),
      dataFinal: this.formBuilder.control(Date.now(), Validators.required),
    });

    this.carregarUnidadePadrao();
  }

  headerUnidadeEvent(unidadeId: string): void {
    this.unidadeId = unidadeId;
  }

  loteFilterEvent(loteFilter: LoteFilter): void {
    debugger;
    this.loteFilter = loteFilter;
    this.filtrarLotes();
  }

  private carregarUnidadePadrao(): void {
    this.unidadeService.obterUnidades()
      .subscribe(
        response => {
          this.unidadeId = response.content[0].id;
          this.filtroLotesForm.controls.unidadeId.setValue(this.unidadeId);
        },
        error => {
          console.log(error);
        });
  }

  filtrarLotes() {
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

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.lotesPageIndex = params.pageIndex;
    this.filtrarLotes();
  }
}
