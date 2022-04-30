import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Services/auth.service';
import { DataService } from '../Services/data.service';
import { Publisher2DialogComponent } from '../publisher2-dialog/publisher2-dialog.component';
import { MatFormField } from '@angular/material/form-field';
import { Publisher } from '../Core/Entities/Publisher';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {

  constructor(private dataService: DataService,
    public auth: AuthService,
    public dialog: MatDialog) { }

  displayedColumns = [
    'name',
    'nationalId',
    'cellPhone',
    'baptismDate',
    'birthDate',
    'assignment',
    'acoes'];

  dataSource!: MatTableDataSource<Publisher>;
  registros: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  defaultLang: string = environment.defaultLang.substring(0, 2);

  async ngOnInit(): Promise<void> {
    //let publishers: Publisher[] = [];
    //publishersDB.forEach(publisher => { publishers.push(new Publisher(publisher)); });

    let publishers = [...await this.dataService.getPublishers()].map(publisher => new Publisher(publisher))

    this.dataSource = new MatTableDataSource(publishers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.registros = publishers.length + 1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;

  async openDialog2(id?: number): Promise<void> {

    let publisher: any;

    if (typeof id !== 'undefined') {
      publisher = await this.dataService.getPublisher(id)!
    }

    let dialogRef = this.dialog.open(Publisher2DialogComponent, {
      width: '80%',
      data: typeof id == 'undefined' ? this.registros : publisher
    }).afterClosed().subscribe(val => {
      if ('atualizar|salvar|save|update'.split('|').includes(val)) {
        this.ngOnInit();
      }
    });
  }

  async deletePublisher(id: number) {
    if (confirm("Deseja realmente apagar o publicador?")) {
      await this.dataService.deletePublisher(id);
      this.ngOnInit();
    }
  }
}