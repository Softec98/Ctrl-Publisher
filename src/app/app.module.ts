import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
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

import { PublisherDialogComponent } from './publisher-dialog/publisher-dialog.component';
import { Publisher2DialogComponent } from './publisher2-dialog/publisher2-dialog.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomMatPaginatorIntlService } from './Services/custom-mat-paginator-intl.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
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

let _dateInput: string = environment.dateInput;

let _dateLocale: string = environment.dateLocale;

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
    ReportListComponent
  ],
  imports: [
    MatDatepickerModule,
    MatMomentDateModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
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
    MatTabsModule
  ],
  entryComponents: [
    PublisherDialogComponent
  ],
  providers: [DataService, AuthService, DatePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },    
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: _dateLocale },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
