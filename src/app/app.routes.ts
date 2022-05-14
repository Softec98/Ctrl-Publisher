import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {Dashboard2Component} from './dashboard2/dashboard2.component';
import {ReportListComponent} from './report-list/report-list.component';
import { DiretivaFrenteComponent } from './diretiva-frente/diretiva-frente.component';
import { DiretivaVersoComponent } from './diretiva-verso/diretiva-verso.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: Dashboard2Component},
  {path: 'reports', component: ReportListComponent},
  {path: 'diretiva-frente', component: DiretivaFrenteComponent},
  {path: 'diretiva-verso', component: DiretivaVersoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouters {}