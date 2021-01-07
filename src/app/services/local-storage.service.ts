import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario";

@Injectable()
export class LocalStorageService {

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('lotes.user'));
    }

    public salvarDadosLocaisUsuario(token: string, usuario: Usuario): void {
        this.salvarTokenUsuario(token);
        this.salvarUsuario(usuario);
    }

    public limparDadosLocaisUsuario(): void {
        localStorage.removeItem('lotes.token');
        localStorage.removeItem('lotes.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('lotes.token');
    }

    private salvarTokenUsuario(token: string): void {
        localStorage.setItem('lotes.token', token);
    }

    private salvarUsuario(usuario: Usuario): void {
        localStorage.setItem('lotes.user', JSON.stringify(usuario));
    }
}