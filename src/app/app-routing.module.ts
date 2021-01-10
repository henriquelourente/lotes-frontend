import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppGuard } from "./app.guard";
import { LoginComponent } from "./login/login.component";
import { LotesComponent } from "./lotes/lotes.component";
import { NotFoundComponent } from "./navegacao/not-found/not-found.component";

const routes: Routes = [
    { path: '', component: LotesComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'lotes', component: LotesComponent, canActivate: [AppGuard] },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule],
})
export class AppRoutingModule { }