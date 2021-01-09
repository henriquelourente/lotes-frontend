import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'situacaoLote' })
export class SituacaoLotePipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 1: return 'Aberto';
            case 2: return 'Fechado';
            case 3: return 'Rejeitado';
            case 4: return 'Reavaliando';
            case 5: return 'Encerrado';
            default: return 'Excluído';
        }
    }

}