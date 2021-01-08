import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Area } from '../models/area';
import { Linha } from '../models/linha';
import { Lote } from '../models/lote';
import { Processo } from '../models/processo';
import { AreaService } from '../services/area.service';
import { LinhaAreaService } from '../services/linha-area.service';
import { LoteService } from '../services/lote.service';
import { ProcessoService } from '../services/processo.service';
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

  constructor(
    private unidadeService: UnidadeService,
    private areaService: AreaService,
    private linhaAreaService: LinhaAreaService,
    private processoService: ProcessoService,
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

  private carregarUnidadePadrao(): void {
    this.unidadeService.obterUnidades()
      .subscribe(
        response => {
          this.unidadeId = response.content[0].id;
          this.filtroLotesForm.controls.unidadeId.setValue(this.unidadeId);
          this.carregarAreas(this.unidadeId);
        },
        error => {
          console.log(error);
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
    if (!this.podePesquisar()) {
      return;
    }

    this.loteService.obterLotes(
      this.filtroLotesForm.controls.unidadeId.value,
      this.filtroLotesForm.controls.areaId.value,
      this.filtroLotesForm.controls.linhaId.value,
      this.filtroLotesForm.controls.processoId.value,
      this.filtroLotesForm.controls.dataInicial.value,
      this.filtroLotesForm.controls.dataFinal.value,
      1)
      .subscribe(
        response => {
          this.lotes = response.data;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  private podePesquisar(): boolean {
    return this.unidadeId
      && this.filtroLotesForm.controls.areaId.value
      && this.filtroLotesForm.controls.linhaId.value
      && this.filtroLotesForm.controls.processoId.value
      && this.filtroLotesForm.controls.dataInicial.value
      && this.filtroLotesForm.controls.dataFinal.value;
  }
}
