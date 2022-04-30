import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../Services/data.service';
import { DataSource } from '@angular/cdk/table';
import { noop, Observable } from 'rxjs';

import { Publisher } from '../Core/Entities/Publisher';
import { AuthService } from '../Services/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { PublisherDialogComponent } from '../publisher-dialog/publisher-dialog.component';
import { Publisher2DialogComponent } from '../publisher2-dialog/publisher2-dialog.component';
import { environment } from 'src/environments/environment';
import { CollectionViewer } from '@angular/cdk/collections';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService,
    public auth: AuthService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  displayedColumns = [
    'name',
    'nationalId',
    'areaCode',
    'cellPhone',
    'baptismDate',
    'birthDate',
    'delete'];

  dataSource = new PublisherDataSource(this.dataService);

  defaultLang:string = environment.defaultLang.substring(0, 2);

  ngOnInit(): void { }

  deletePublisher(id: number) {
    if (this.auth.isAuthenticated()) {
      this.dataService.deletePublisher(id);
      this.dataSource = new PublisherDataSource(this.dataService);
    } else {
      alert('Apenas logado é possível de excluir.');
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(PublisherDialogComponent, {
      width: '600px',
      data: 'Incluir Publicador'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addPublisher(result.data);
      this.dataSource = new PublisherDataSource(this.dataService);
    });
  }

  openDialog2(id?: number): void {

    let publisher: any;

    if (typeof id !== 'undefined') {
      publisher = this.dataService.getPublisher(id!)
        // .subscribe({
        //   next: (resultado: any) => {
        //     publisher = resultado;
        //   }
        // });
    }

    let dialogRef = this.dialog.open(Publisher2DialogComponent, {
      width: '80%',
      data: typeof publisher == 'undefined' ? null : publisher
    });
  }
}

export class PublisherDataSource extends DataSource<any> {
  connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
    throw new Error('Method not implemented.');
  }
  constructor(private dataService: DataService) {
    super();
  }

  // connect(): Observable<Publisher[]> {
  //   return this.dataService.getPublishers();
  // }

  disconnect() {
  }
}