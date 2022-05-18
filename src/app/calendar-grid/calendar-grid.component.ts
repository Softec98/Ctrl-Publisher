import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { DataService } from '../Services/data.service';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { CalendarDB } from '../Core/Entities/CalendarDB';
import { CalendarPipe } from '../Pipes/calendar.pipe'

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CalendarGridComponent implements OnInit {

  date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  constructor(private dataService: DataService) { }

  displayedColumns = [
    'calendar',
    'acoes'];

  dataSource!: MatTableDataSource<any>;
  registros: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  defaultLang: string = environment.defaultLang.substring(0, 2);

  async ngOnInit(): Promise<void> {
    let calendars = await this.dataService.getCalendars();
    this.dataSource = new MatTableDataSource(calendars);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.registros = await this.dataService.getLastCalendar() + 1;
  }

  async deleteCalendar(id: number, calendar?: string) {
    let calendarPipe = new CalendarPipe();
    if (confirm(`ATENÇÃO! Esse procedimento APAGARÁ todos os relatórios do mês, se houver.\nDeseja realmente apagar a competência (mês/ano): [${calendarPipe.transform(calendar!)}]?`)) {
      await this.dataService.deleteCalendar(id);
      this.dataService.calendars = [];
      this.ngOnInit();
    }
  }

  async adicionarCalendar(): Promise<void> {
    if (this.date.value) {
      const ctrlValue = new Date(this.date.value);
      let calendar = ctrlValue.getFullYear() * 100 + ctrlValue.getMonth() + 1;
      await this.dataService.addCalendar(new CalendarDB({
        Id: this.registros,
        Calendar: calendar
      }));
      this.dataService.calendars = [];
      this.ngOnInit()
    }
  }
}