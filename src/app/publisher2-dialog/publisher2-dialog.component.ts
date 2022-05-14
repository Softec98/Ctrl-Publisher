import { Component, ElementRef, ViewChild, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../Services/data.service';
import { CepService } from '../Services/cep.service';
import { PublisherDB } from '../Core/Entities/PublisherDB';
import { Utils } from '../Core/Utils/Utils';
import { environment } from 'src/environments/environment';
import { IAuxiliar } from '../Core/Interfaces/IAuxiliar';

@Component({
  selector: 'app-publisher2-dialog',
  templateUrl: './publisher2-dialog.component.html',
  styleUrls: ['./publisher2-dialog.component.scss']
})

export class Publisher2DialogComponent implements OnInit {

  private defaultLang: string = this.dataService.getBrowserLang();
  private environLang: string = environment.defaultLang;

  cpfMask = Utils.cpfMask;
  rgMask = Utils.rgMask;
  foneMask(numberLength = 9) {
    return {
      guide: true,
      showMask: true,
      mask: numberLength == 9 ? Utils.fone9Mask : Utils.fone8Mask
    }
  }

  form!: FormGroup;
  actionBtn: string = this.dataService.getTranslation('SAVE', 'BUTTONS');
  listaExclusao1!: string;
  listaExclusao2!: string;

  assignments: IAuxiliar[] = [];
  groups: IAuxiliar[] = [];
  situations: IAuxiliar[] = [];
  maritalStatus: IAuxiliar[] = [];
  genders: IAuxiliar[] = [];
  states: IAuxiliar[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public cepService: CepService,
    public dialogRef: MatDialogRef<Publisher2DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  @ViewChild("number") numberInputField!: ElementRef;
  //@ViewChild("nationalId") nationalIdInputField!: ElementRef;

  private carregarSeletores() {
    const promise1 = this.dataService.getAssignments();
    const promise2 = this.dataService.getGroups();
    const promise3 = this.dataService.getSituations();
    const promise4 = this.dataService.getMaritalStatus();
    const promise5 = this.dataService.getGenders();
    const promise6 = this.dataService.getStates();
    const promises = [promise1, promise2, promise3, promise4, promise5, promise6]
    Promise.allSettled(promises).
      then((results) => results.forEach((result) => console.log(result.status))).
      finally(() => this.atualizarSeletores());
  }

  private atualizarSeletores() {
    this.assignments = this.dataService.assignments;
    this.groups = this.dataService.groups,
    this.situations = this.dataService.situations;
    this.maritalStatus = this.dataService.maritalStatus;
    this.genders = this.dataService.genders;
    this.states = this.dataService.states;
  }

  ngOnInit() {

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
      NationalId: this.formBuilder.control({ value: this.data?.NationalId ?? '', disabled: false }, Utils.isValidCpf()),
      GeneralId: [this.data?.GeneralId ?? ''],
      Name: new FormControl(this.data?.Name ?? '', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z].*[\s\.]*$/) // /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*/
      ])),
      Gender: [this.data?.Gender ?? '', Validators.required],
      BaptismDate: [this.data !== null ? this.data?.BaptismDate : '', Validators.required],
      BirthDate: [this.data !== null ? this.data?.BirthDate : '', Validators.required],
      ZipCode: [this.data?.ZipCode ?? ''],
      Address: [this.data?.Address ?? ''],
      Number: [this.data?.Number ?? ''],
      Complement: [this.data?.Complement ?? ''],
      Suburb: [this.data?.Suburb ?? ''],
      State: [this.data?.State ?? ''],
      City: [this.data?.City ?? ''],
      Email: [this.data?.Email ?? '', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      AreaCode: [this.data?.AreaCode ?? ''],
      PhoneNumber: [this.data?.PhoneNumber ?? '', Validators.pattern(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/)],
      CellPhone: [this.data?.CellPhone ?? '', Validators.pattern(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/)],
      MaritalStatusId: [this.data?.MaritalStatusId ?? ''],
      GroupId: [this.data?.GroupId ?? ''],
      AssignmentId: [this.data?.AssignmentId ?? ''],
      SituationId: [this.data?.SituationId ?? ''],
      IsRegularPioneer: [this.data?.IsRegularPioneer ?? false],
      IsAnointed: [this.data?.IsAnointed ?? false],
      IsLegalRepresentative: [this.data?.IsLegalRepresentative ?? false],
      Ocupation: [this.data?.Ocupation ?? ''],
      Nationality: [this.data?.Nationality ?? ''],
      Remark: [this.data?.Remark ?? ''],
      Witness1Name: [this.data?.Witness1Name ?? ''],
      Witness1GeneralId: [this.data?.Witness1GeneralId ?? ''],
      Witness2Name: [this.data?.Witness2Name ?? ''],
      Witness2GeneralId: [this.data?.Witness2GeneralId ?? ''],
      LegalRepresentative1Id: [this.data?.LegalRepresentative1Id ?? -1],
      LegalRepresentative2Id: [this.data?.LegalRepresentative2Id ?? -1],
      FillDate: [this.data?.FillDate ?? null]
    });

    if (this.data) {
      this.actionBtn = this.dataService.getTranslation('UPDATE', 'BUTTONS');
    }

    let id = this.form.controls['Id'].value;
    this.listaExclusao1 = this.atualizarlistaExclusao(id, 1);
    this.listaExclusao2 = this.atualizarlistaExclusao(id, 2);

    // if (this.nationalIdInputField) {
    //   this.nationalIdInputField.nativeElement.setSelectionRange(0, 0);
    //   this.nationalIdInputField.nativeElement.focus();
    // }
  }

  private atualizarlistaExclusao(id: number, ordem: number): string {
    if (ordem == 1) {
      return `${id},${this.form.controls['LegalRepresentative2Id'].value ?? 0}`;
    }
    else {
      return `${id},${this.form.controls['LegalRepresentative1Id'].value ?? 0}`;
    }
  }

  aoSairDoProcurado(item: number, e: Event) {

    let id = this.form.controls['Id'].value;

    switch (item) {
      case 1:
        this.listaExclusao2 = `${id},${e ?? 0}`;
        this.listaExclusao1 = this.atualizarlistaExclusao(id, 1);
        break;
      case 2:
        this.listaExclusao1 = `${id},${e ?? 0}`;
        this.listaExclusao2 = this.atualizarlistaExclusao(id, 2);
        break;
    }
  }

  private focarNoNumero() {
    this.numberInputField.nativeElement.focus();
  }

  async adicionarPublicador(): Promise<void> {
    if (this.form.valid) {

      if ('save|salvar'.split('|').includes(this.actionBtn.toLowerCase())) {
        await this.dataService.addPublisher(new PublisherDB(this.form.value))
      }
      else {
        await this.dataService.editPublisher(new PublisherDB(this.form.value))
      }

      this.form.reset();

      this.dialogRef.close(this.actionBtn.toLowerCase());
    }
    else {

      console.log("Formulário com erro.");
    }
  }

  tratamentoPadrao(): void {
    this.form.patchValue({
      Remark: environment.DefaultRemark
    });
  }

  nacionalidadePadrao(): void {
    this.form.patchValue({
      Nationality: this.environLang == 'en' ? 'Brazilian' : 'Brasileir' +
        (this.form.controls['Gender'].value == 'F' ? 'a' : 'o')
    });
  }

  async obterPublicador(): Promise<void> {

    let id: string = this.form.controls['NationalId'].value.match(/\d/g)?.join('');

    if (typeof id !== 'undefined' && id !== '') {

      this.data = await this.dataService.getPublisherById(id)

      this.ngOnInit();
    }

  }

  obterEndereco(): void {

    let cep: string = this.form.controls['ZipCode'].value.match(/\d/g)?.join('');

    if (typeof cep !== 'undefined' && cep !== null && cep !== '' && this.form.controls['ZipCode'].valid) {

      this.cepService.getAddress(cep)
        .subscribe({
          next: (endereco: any) => {
            if (this)
              if (this.environLang == 'en') {
                this.form.patchValue({
                  Suburb: endereco.City,
                  State: endereco.State,
                  City: endereco.County
                });
              }
              else {
                this.form.patchValue({
                  Address: endereco.logradouro,
                  Complement: endereco.complemento,
                  Suburb: endereco.bairro,
                  State: endereco.uf,
                  City: endereco.localidade
                });
              }
            this.focarNoNumero();
          },
          error: (err: any) => {
            alert(`Erro ao buscar o CEP: ${err.message}`);
          }
        });
    }
  }

  selectGroup = this.defaultLang == 'en' ? 'Select a group' : 'Selecione o grupo';
  selectState = this.defaultLang == 'en' ? 'Select a state' : 'Selecione o estado';
  selectAssignment = this.defaultLang == 'en' ? 'Select an assignment' : 'Selecione a designação';
  selectSituation = this.defaultLang == 'en' ? 'Select a situation' : 'Selecione a situação';
  selectMaritalStatus = this.defaultLang == 'en' ? 'Select a marital status' : 'Selecione o estado civil';

  publisher_validation_messages = this.dataService.getPublisherValidation();
}