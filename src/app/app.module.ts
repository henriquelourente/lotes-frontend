import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { MenuComponent } from './navegacao/menu/menu.component';
import { FooterComponent } from './navegacao/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LotesListaComponent } from './lotes-lista/lotes-lista.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { LoginService } from './services/login.service';
import { AppGuard } from './app.guard';
import { LocalStorageService } from './services/local-storage.service';

import { ToastrModule } from 'ngx-toastr';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    LotesListaComponent,
    NotFoundComponent
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
    ToastrModule.forRoot(),
  ],
  providers: [
    LoginService,
    { provide: NZ_I18N, useValue: en_US },
    LocalStorageService,
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
