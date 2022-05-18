import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
  publishers: any = [];
  types: IAuxiliar[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  @ViewChild("videos") videoInputField!: ElementRef;
  
  private carregarSeletores() {
    const promise1 = this.dataService.getTypes();
    const promise2 = this.dataService.getPublishersFiltered(this.data?.publishersIds!);
    const promises = [promise1, promise2]
    Promise.allSettled(promises).
      then((results) => results.forEach((result) => console.log(result.status))).
      finally(() => this.atualizarSeletores());
  }

  private atualizarSeletores() {
    this.types = this.dataService.types;
    this.publishers = this.dataService.publishersFiltered;
  }

  ngOnInit(): void {

    let ultimoId: number = 0;

    if (!this.data?.report) {
      if (typeof this.data.registros == 'number' && this.data.registros > 0) {
        ultimoId = this.data?.registros;
        this.data.report = undefined;
      }
    }

    this.carregarSeletores();

    this.form = this.formBuilder.group({
      Id: [this.data?.report?.Id ?? ultimoId],
      TypeId: [this.data?.report?.TypeId ?? -1],
      PublisherId: [this.data?.report?.PublisherId ?? 0],
      CalendarId: [this.data?.report?.CalendarId ?? this.dataService.calendarId],
      Hours: [this.data?.report?.Hours ?? 0],
      Publications: [this.data?.report?.Publications ?? 0],
      Revisits: [this.data?.report?.Revisits ?? 0],
      Studies: [this.data?.report?.Studies ?? 0],
      Videos: [this.data?.report?.Videos ?? 0]
    });

    if (this.data?.report) {
      this.actionBtn = this.dataService.getTranslation('UPDATE', 'BUTTONS');
      this.name = this.dataService.getPublisherName(this.data?.report?.PublisherId);
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

  aoSelecionarPublicador() {
    if (this.form.controls['TypeId'].value == -1) {
      let id = this.form.controls['PublisherId'].value;
      let typeId = this.dataService.getPublisherTypeId(id);
      this.form.patchValue({
        TypeId: typeId
      });
      this.focarNoVideo();
    }
  }

  private focarNoVideo() {
    this.videoInputField.nativeElement.focus();
  }

  selectType = this.defaultLang == 'en' ? 'Select a type' : 'Selecione o tipo';

  selectPublisher = this.defaultLang == 'en' ? 'Select a publisher' : 'Selecione o publicador';
}