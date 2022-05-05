import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { DataService } from '../Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

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
  registros: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  defaultLang: string = environment.defaultLang.substring(0, 2);

  async ngOnInit(): Promise<void> {
    if (this.calendar !== '') {
      let reports = await this.dataService.getReportsByCalendar(Number(this.calendar));
      this.dataSource = new MatTableDataSource(reports);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.registros = await this.dataService.getLastReport() + 1;
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

    let report: any;

    if (typeof id !== 'undefined') {
      report = await this.dataService.getReport(id)!
    }

    let dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '60%',
      data: typeof id == 'undefined' ? this.registros : report
    }).afterClosed().subscribe(val => {
      if ('atualizar|salvar|save|update'.split('|').includes(val)) {
        this.ngOnInit();
      }
    });
  }
}