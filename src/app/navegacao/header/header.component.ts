import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unidade } from 'src/app/models/unidade';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  unidades: Unidade[];

  @Input('unidadeId')
  unidadeId: string;

  @Output() 
  unidadeIdEmitter = new EventEmitter<String>();

  constructor(private unidadeService: UnidadeService) {
    this.inicializarUnidades();
   }

  ngOnInit(): void {
    
  }

  unidadeChange(unidadeId: string): void {
    this.unidadeIdEmitter.emit(unidadeId);
  }

  private inicializarUnidades(): void {
    this.unidadeService.obterUnidades()
      .subscribe(
        response => {
          this.unidades = response.content;
          // this.unidadeId = this.unidades[0]?.id;
          // this.unidadeChange(this.unidadeId);
        },
        error => {
          console.log(error);
        });
  }
}
