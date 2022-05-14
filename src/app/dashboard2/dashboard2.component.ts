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
import { DiretivaFrenteComponent } from '../diretiva-frente/diretiva-frente.component';
import { DiretivaVersoComponent } from '../diretiva-verso/diretiva-verso.component';
import { ILegalRepresentative } from "../Core/Interfaces/ILegalRepresentative";

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

  async openDialogDiretiva(id: number, action: string = 'show'): Promise<void> {
    let publisher: any;
    if (typeof id !== 'undefined') {
      publisher = new Publisher(await this.dataService.getPublisher(id)!);
      publisher.action = action;
      publisher.MaritalStatus = await this.dataService.getMaritalStatusById(publisher.MaritalStatusId!, publisher.Gender);
      if (publisher.Remark?.length > 0) {
        publisher.RemarkInLines = publisher.Remark.match(/.{1,100}(\s|$)/g);
      }
      for (let i = 0; i < 2; i++) {
        let num = i == 1 ? publisher.LegalRepresentative1Id : publisher.LegalRepresentative2Id
        if (num > 0) {
          let legal = await this.dataService.getPublisher(num);
          let maritalStatus = await this.dataService.getMaritalStatusById(legal?.MaritalStatusId!, legal?.Gender);
          if (legal && legal.Name) {
            publisher.LegalRepresentative.push({
              Name: legal.Name,
              Nationality: legal?.Nationality,
              Ocupation: legal?.Ocupation,
              MaritalStatus: maritalStatus,
              GeneralId: legal?.GeneralId,
              NationalId: legal?.NationalId,
              ZipCode: legal?.ZipCode,
              Address: legal?.Address,
              Complement: legal?.Complement,
              Number: legal?.Number,
              Suburb: legal?.Suburb,
              City: legal?.City,
              State: legal?.State,
              AreaCode: legal?.AreaCode,
              PhoneNumber: (legal?.PhoneNumber && legal?.PhoneNumber.length > 0 ?
                legal?.AreaCode : '') + legal?.PhoneNumber,
              CellPhone: legal?.AreaCode + legal?.CellPhone
            } as ILegalRepresentative);
          }
        }
      }

      if (action == 'download') {
        const promise1 =this.dialog.open(DiretivaFrenteComponent, { data: publisher });
        const promise2 = this.dialog.open(DiretivaVersoComponent, { data: publisher });
        const promises = [promise1, promise2]
        Promise.allSettled(promises).
          then((results) => results.forEach((result) => console.log(result.status))).
          finally(() => console.log('baixou 2 arquivos, frente e verso...'));        
      }
      else {
        if (confirm(`Deseja ver a frente do documento?`)) {
          let dialogRef = this.dialog.open(DiretivaFrenteComponent, { data: publisher });
        } else if (confirm(`Deseja ver o verso do documento?`)) {
          let dialogRef = this.dialog.open(DiretivaVersoComponent, { data: publisher });
        }
      }
    }
  }

  async deletePublisher(id: number) {
    if (confirm("Deseja realmente apagar o publicador?")) {
      await this.dataService.deletePublisher(id);
      this.ngOnInit();
    }
  }
}