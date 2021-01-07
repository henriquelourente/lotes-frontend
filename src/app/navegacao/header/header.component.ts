import { Component, OnInit } from '@angular/core';
import { Unidade } from 'src/app/models/unidade';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  unidades: Unidade[];
  unidade: Unidade;

  constructor(private unidadeService: UnidadeService) { }

  ngOnInit(): void {
    this.unidadeService.obterUnidades()
      .subscribe(
        response => {
          this.unidades = response.content;
          this.unidade = this.unidades[0];
        },
        error => {
          console.log(error);
        });
  }
}
