import { HttpHeaders } from "@angular/common/http";

export abstract class BaseService {
    protected UrlServiceV1: string = '';

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Timezone": "-180"
            })
        }
    }

}