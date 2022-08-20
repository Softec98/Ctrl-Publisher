import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // NoopAnimationsModule
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRouters } from './app.routes';
import { MaterialModule } from './material.module';
import { DataService } from './Services/data.service';
import { AuthService } from './Services/auth.service';
import { InputErrorPipe } from './publisher-dialog/input-error.pipe';
import { TextMaskModule } from 'angular2-text-mask';

import { DatePickerComponent } from './date-datepicker/date-datepicker.component';
import { DatePipe } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PublisherDialogComponent } from './publisher-dialog/publisher-dialog.component';
import { Publisher2DialogComponent } from './publisher2-dialog/publisher2-dialog.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomMatPaginatorIntlService } from './Services/custom-mat-paginator-intl.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/')
}

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';
import { MaskDateDirective } from './Directives/mask-date.directive';
import { MaskCepDirective } from './Directives/mask-cep.directive';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CpfPipe } from './Pipes/cpf.pipe';
import { TelefonePipe } from './Pipes/telefone.pipe';
import { SelectOnFocusDirective } from './Directives/select-on-focus.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { LegalRepresentativeComponent } from './legal-representative/legal-representative.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportGridComponent } from './report-grid/report-grid.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';
import { CalendarPipe } from './Pipes/calendar.pipe';
import { DiretivaFrenteComponent } from './diretiva-frente/diretiva-frente.component';
import { DiretivaVersoComponent } from './diretiva-verso/diretiva-verso.component';
import { RgPipe } from './Pipes/rg.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { PromptComponent } from './prompt/prompt.component';
import { PwaService } from './Services/pwa.service';
import { DiretivaDialogComponent } from './diretiva-dialog/diretiva-dialog.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

const _dateInput: string = environment.dateInput;

const _dateLocale: string = environment.dateLocale;

export const MY_FORMATS = {
  parse: {
    dateInput: _dateInput
  },
  display: {
    dateInput: _dateInput,
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    Dashboard2Component,
    DatePickerComponent,
    InputErrorPipe,
    PublisherDialogComponent,
    Publisher2DialogComponent,
    MaskDateDirective,
    MaskCepDirective,
    CpfPipe,
    TelefonePipe,
    SelectOnFocusDirective,
    LegalRepresentativeComponent,
    ReportListComponent,
    ReportGridComponent,
    ReportDialogComponent,
    CalendarGridComponent,
    CalendarPipe,
    DiretivaFrenteComponent,
    DiretivaVersoComponent,
    RgPipe,
    SpinnerOverlayComponent,
    PromptComponent,
    DiretivaDialogComponent,
    ContactGridComponent,
    ContactDialogComponent
  ],
  imports: [
    MatDatepickerModule,
    MatMomentDateModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    //NoopAnimationsModule,
    FlexLayoutModule,
    AppRouters,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000' // 'registerImmediately'
    }),
    MatProgressSpinnerModule
  ],
  entryComponents: [
    PromptComponent,
    PublisherDialogComponent
  ],
  providers: [DataService, AuthService, DatePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },    
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: _dateLocale },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlService },
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}