import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { DataService } from '../Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { ReportDB } from '../Core/Entities/ReportDB';

const noop = () => { };

@Component({
  selector: 'app-report-grid',
  templateUrl: './report-grid.component.html',
  styleUrls: ['./report-grid.component.scss']
})
export class ReportGridComponent implements OnInit {

  @Input() calendar: string = '';

  constructor(private dataService: DataService,
    public dialog: MatDialog) { }

  displayedColumns = [
    'name',
    'type',
    'videos',
    'publications',
    'revisits',
    'studies',
    'hours',
    'acoes'];

  dataSource!: MatTableDataSource<any>;
  reportData = new ReportData();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  defaultLang: string = environment.defaultLang.substring(0, 2);

  async ngOnInit(): Promise<void> {
    if (this.calendar !== '') {
      let reports = await this.dataService.getReportsByCalendar(Number(this.calendar));
      this.reportData.publishersIds = [];
      reports.forEach(x => this.reportData.publishersIds.push(x.publisherId));
      this.dataSource = new MatTableDataSource(reports);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      this.dataSource.sort = this.sort;
      this.reportData.registros = await this.dataService.getLastReport() + 1;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes['calendar'].previousValue != 'undefined') {
      this.ngOnInit();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async deleteReport(id: number) {

    if (confirm("Deseja realmente apagar o relatório?")) {
      await this.dataService.deleteReport(id);
      this.ngOnInit();
    }
  }

  async openReport(id?: number): Promise<void> {

    let abrirDialog = true

    if (typeof id === 'undefined') {
      this.reportData.report = undefined;
      if (this.reportData.publishersIds.length == 0) {
        if (confirm("Esse mês está vazio, deseja popular com publicadores ativos?")) {
          let reports: ReportDB[] = [];
          let reportId: number = await this.dataService.getLastReport();
          await this.dataService.getPublishersFiltered();
          this.dataService.publishersFiltered.forEach((x: { Id: number, TypeId: number }) => {
            reportId++;
            reports.push(new ReportDB({
              Id: reportId,
              PublisherId: x.Id,
              CalendarId: this.dataService.calendarId, 
              TypeId: x.TypeId
            }));
          });
          await this.dataService.addReportBulk(reports);
          abrirDialog = false;
          this.ngOnInit();
        }
      }
    }
    else {
      this.reportData.report = await this.dataService.getReport(id)!
    }

    if (abrirDialog) {
      let dialogRef = this.dialog.open(ReportDialogComponent, {
        width: '60%',
        data: this.reportData
      }).afterClosed().subscribe(val => {
        if ('atualizar|salvar|save|update'.split('|').includes(val)) {
          this.ngOnInit();
        }
      });
    }
  }
}

class ReportData {
  registros!: number;
  publishersIds!: number[];
  report: ReportDB | undefined;

  constructor() {
    this.registros = 0;
    this.publishersIds = [];
    this.report = undefined;
  }
}