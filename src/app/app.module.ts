import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navegacao/header/header.component';
import { FooterComponent } from './navegacao/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LotesComponent } from './lotes/lotes.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { LoginService } from './services/login.service';
import { AppGuard } from './app.guard';
import { LoteService } from './services/lote.service';
import { LocalStorageService } from './services/local-storage.service';
import { AreaService } from './services/area.service';
import { LinhaAreaService } from './services/linha-area.service';
import { ProcessoService } from './services/processo.service';
import { UnidadeService } from './services/unidade.service';
import { SituacaoLotePipe } from './pipes/situacao-lote.pipe';

import { ToastrModule } from 'ngx-toastr';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LotesFiltroComponent } from './lotes/lotes-filtro/lotes-filtro.component';
import { LotesListaComponent } from './lotes/lotes-lista/lotes-lista.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LotesComponent,
    NotFoundComponent,
    LotesFiltroComponent,
    SituacaoLotePipe,
    LotesListaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTableModule,
    NzIconModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    LoginService,
    { provide: NZ_I18N, useValue: en_US },
    LocalStorageService,
    UnidadeService,
    AreaService,
    LinhaAreaService,
    ProcessoService,
    LoteService,
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
