import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from 'src/app/models/area';
import { LoteFilter } from 'src/app/models/filter/lote-filter';
import { Linha } from 'src/app/models/linha';
import { Lote } from 'src/app/models/lote';
import { Processo } from 'src/app/models/processo';
import { AreaService } from 'src/app/services/area.service';
import { LinhaAreaService } from 'src/app/services/linha-area.service';
import { ProcessoService } from 'src/app/services/processo.service';

@Component({
  selector: 'app-lotes-filtro',
  templateUrl: './lotes-filtro.component.html',
  styleUrls: ['./lotes-filtro.component.css']
})
export class LotesFiltroComponent implements OnInit {

  filtroLotesForm: FormGroup;

  private _unidadeId: string;

  @Input()
  set unidadeId(unidadeId: string) {
    this._unidadeId = unidadeId;
    this.carregarAreas(this.unidadeId);
  }

  get unidadeId(): string {
    return this._unidadeId;
  }

  areas: Area[];
  linhas: Linha[];
  processos: Processo[];
  lotes: Lote[]
  lotesPageIndex: number = 1;
  lotesPageSize: number = 21;
  lotesCount: number = 0;
  lotesLoading: boolean = false;

  @Output()
  loteFilterEmitter = new EventEmitter<LoteFilter>();

  constructor(
    private areaService: AreaService,
    private linhaAreaService: LinhaAreaService,
    private processoService: ProcessoService,
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
  }

  private carregarAreas(unidadeId: string): void {
    this.areaService.obterAreasPorUnidade(unidadeId)
      .subscribe(
        response => {
          this.areas = response.content;
        },
        error => {
          console.log(error);
        });
  }

  areaChange(areaId: string): void {
    this.filtroLotesForm.controls.linhaId.setValue(null);

    this.linhaAreaService.obterLinhasPorArea(areaId)
      .subscribe(
        response => {
          this.linhas = response.content;
        },
        error => {
          console.log(error);
        });
  }

  linhaChange(linhaId: string): void {
    this.filtroLotesForm.controls.processoId.setValue(null);

    this.processoService.obterProcessosPorLinhaAreaUnidade(this.unidadeId, this.filtroLotesForm.controls.areaId.value, linhaId)
      .subscribe(
        response => {
          this.processos = response.content;
        },
        error => {
          console.log(error);
        });
  }

  filtrarLotes() {
    const loteFilter: LoteFilter = {
      unidadeId: this.unidadeId,
      areaId: this.filtroLotesForm.controls.areaId.value,
      linhaId: this.filtroLotesForm.controls.linhaId.value,
      processoId: this.filtroLotesForm.controls.processoId.value,
      dataInicial: this.filtroLotesForm.controls.dataInicial.value,
      dataFinal: this.filtroLotesForm.controls.dataFinal.value,
    };

    this.loteFilterEmitter.emit(loteFilter);
  }
}
