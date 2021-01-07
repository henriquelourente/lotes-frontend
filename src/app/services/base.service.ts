import { HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

export abstract class BaseService {
    protected baseUrl: string = 'http://localhost:8083/api';

    constructor(private localStorageService: LocalStorageService){

    }

    protected obterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Timezone": "-180"
            })
        }
    }

    protected obterHeaderAutenticadoJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Timezone": "-180",
                "Authorization": this.localStorageService.obterTokenUsuario()
            })
        }
    }

    protected serviceError(response: Response | any) {
        return throwError(response);
    }
}