import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { DataService } from '../Services/data.service';
import { ReportDB } from '../Core/Entities/ReportDB';
import { IAuxiliar } from '../Core/Interfaces/IAuxiliar';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  private defaultLang: string = this.dataService.getBrowserLang();
  private environLang: string = environment.defaultLang;

  form!: FormGroup;
  actionBtn: string = this.dataService.getTranslation('SAVE', 'BUTTONS');
  name!: string;
  publishers: any = this.dataService.publishers;

  types: IAuxiliar[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    private carregarSeletores() {
      const promise1 = this.dataService.getTypes();
      const promises = [promise1] 
      Promise.allSettled(promises).
        then((results) => results.forEach((result) => console.log(result.status))).
        finally(() => this.atualizarSeletores());
    }
  
    private atualizarSeletores() {
      this.types = this.dataService.types;
    }

  ngOnInit(): void {

    this.carregarSeletores();

    let ultimoId: number = 0;

    if (this.data) {
      if (typeof this.data == 'number') {
        ultimoId = this.data;
        this.data = undefined;
      }
    }

    this.form = this.formBuilder.group({
      Id: [this.data?.Id ?? ultimoId],
      TypeId: [this.data?.TypeId ?? -1],
      PublisherId: [this.data?.PublisherId ?? 0],
      CalendarId: [this.data?.CalendarId ?? this.dataService.calendarId],
      Hours: [this.data?.Hours ?? 0],
      Publications: [this.data?.Publications ?? 0],
      Revisits: [this.data?.Revisits ?? 0],
      Studies: [this.data?.Studies ?? 0],
      Videos: [this.data?.Videos ?? 0]
    });

    if (this.data) {
      this.actionBtn = this.dataService.getTranslation('UPDATE', 'BUTTONS');
      this.name = this.dataService.getPublisherName(this.data?.PublisherId);
    }
  }

  async adicionarRelatorio(): Promise<void> {
    if (this.form.valid) {

      if ('save|salvar'.split('|').includes(this.actionBtn.toLowerCase())) {
        await this.dataService.addReport(new ReportDB(this.form.value))
      }
      else {
        await this.dataService.editReport(new ReportDB(this.form.value))
      }

      this.form.reset();

      this.dialogRef.close(this.actionBtn.toLowerCase());
    }
    else {

      console.log("Formulário com erro.");
    }
  }

  selectType = this.defaultLang == 'en' ? 'Select a type' : 'Selecione o tipo';

  selectPublisher = this.defaultLang == 'en' ? 'Select a publisher' : 'Selecione o publicador';
}