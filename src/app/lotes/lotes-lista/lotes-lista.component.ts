import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Lote } from 'src/app/models/lotes/lote';
import { ReavaliarLote } from 'src/app/models/lotes/reavaliar-lote';

@Component({
  selector: 'app-lotes-lista',
  templateUrl: './lotes-lista.component.html',
  styleUrls: ['./lotes-lista.component.css']
})
export class LotesListaComponent {

  lotesPageSize: number = 21;

  @Input() lotes: Lote[];
  @Input() lotesCount: number;
  @Input() lotesLoading: boolean;

  @Output() tableIndexChangeEmitter = new EventEmitter<number>();
  @Output() reavaliarEmmiter = new EventEmitter<ReavaliarLote>();

  constructor() { }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.tableIndexChangeEmitter.emit(params.pageIndex);
  }

  reavaliar(lote: Lote) {
    const reavaliarLote: ReavaliarLote = { id: lote.id, situacao: lote.situacao };
    this.reavaliarEmmiter.emit(reavaliarLote)
  }
}
