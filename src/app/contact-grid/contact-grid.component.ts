import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { DataService } from '../Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { ContactDB } from '../Core/Entities/ContactDB';

const noop = () => { };

@Component({
  selector: 'app-contact-grid',
  templateUrl: './contact-grid.component.html',
  styleUrls: ['./contact-grid.component.scss']
})
export class ContactGridComponent implements OnInit {

  @Input() publisherId: string = '';

  constructor(private dataService: DataService,
    public dialog: MatDialog) { }

  displayedColumns = [
    'name',
    'cellPhone',
    'email',
    'acoes'];

  dataSource!: MatTableDataSource<any>;
  contactData = new ContactData();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  defaultLang: string = environment.defaultLang.substring(0, 2);

  async ngOnInit(): Promise<void> {
    if (this.publisherId != '') {
      let contacts = await this.dataService.getContactsByPublisher(Number(this.publisherId));
      this.dataSource = new MatTableDataSource(contacts);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      this.dataSource.sort = this.sort;
      this.contactData.publisherId = Number(this.publisherId);
      this.contactData.registros = await this.dataService.getLastContact() + 1;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes['publisherId'].previousValue != 'undefined') {
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

  async deleteContact(id: number) {

    if (confirm("Deseja realmente apagar o contato?")) {
      await this.dataService.deleteContact(id);
      this.ngOnInit();
    }
  }

  async openContact(id?: number): Promise<void> {

    if (typeof id === 'undefined') {
      this.contactData.contact = new ContactDB();
    }
    else {
      this.contactData.contact = await this.dataService.getContact(id)!
    }
    this.contactData.publisherId = Number(this.publisherId);

    let dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '60%',
      data: this.contactData
    }).afterClosed().subscribe(val => {
      if ('atualizar|salvar|save|update'.split('|').includes(val)) {
        this.ngOnInit();
      }
    });
  }

}

class ContactData {
  registros!: number;
  publisherId!: number;
  contact: ContactDB | undefined;

  constructor() {
    this.registros = 0;
    this.publisherId = 0;
    this.contact = undefined;
  }
}