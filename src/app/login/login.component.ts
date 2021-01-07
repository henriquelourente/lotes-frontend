import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ResultMessage } from '../models/result/result';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login.service';

import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario: Usuario;
  mensagens: Array<ResultMessage>;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required)
    });
  }

  login(): void {
    this.usuario = Object.assign({}, this.usuario, this.loginForm.value);
    this.loginService.login(this.usuario).subscribe(
      response => {
        if (response.messages?.length) {
          this.mensagens = response.messages;
          this.exibirMensagensErro(response.messages);
        }
        else {
          this.localStorageService.salvarDadosLocaisUsuario(response.content, this.usuario);
          this.router.navigate(['/lotes']);
        }

        console.log(response)
      },
      error => { console.log(error) }
    );
  }

  exibirMensagensErro(mensagens: Array<ResultMessage>): void {
    mensagens.forEach(mensagem => {
      this.toastrService.error(mensagem.content, 'Erro :-(')
    });
  }
}
