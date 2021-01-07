import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LocalStorageService } from "./services/local-storage.service";

@Injectable()
export class AppGuard implements CanActivate {

    constructor(private localStorageService: LocalStorageService, private router: Router) { }

    canActivate(): boolean {
        if (this.localStorageService.obterTokenUsuario()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}