import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Lote } from 'src/app/models/lote';

@Component({
  selector: 'app-lotes-lista',
  templateUrl: './lotes-lista.component.html',
  styleUrls: ['./lotes-lista.component.css']
})
export class LotesListaComponent implements OnInit {

  lotesPageSize: number = 21;

  @Input() lotes: Lote[];
  @Input() lotesCount: number;
  @Input() lotesLoading: boolean;

  @Output() tableIndexChangeEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.tableIndexChangeEmitter.emit(params.pageIndex);
  }
}
