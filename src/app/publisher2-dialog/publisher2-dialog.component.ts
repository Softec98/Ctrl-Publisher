import { Component, ElementRef, ViewChild, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../Services/data.service';
import { CepService } from '../Services/cep.service';
import { PublisherDB } from '../Core/Entities/PublisherDB';
import { GenericValidator } from '../Core/Utils/GenericValidator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publisher2-dialog',
  templateUrl: './publisher2-dialog.component.html',
  styleUrls: ['./publisher2-dialog.component.scss']
})

export class Publisher2DialogComponent implements OnInit {

  private defaultLang: string = this.dataService.getBrowserLang();
  private environLang: string = environment.defaultLang;

  cpfMask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  };

  rgMask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d|X/]
  };

  public foneMask = function (numberLength = 9) {

    return {
      guide: true,
      showMask: true,
      mask: numberLength == 8 ? [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] :
        [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }

  form!: FormGroup;
  actionBtn: string = this.dataService.getTranslation('SAVE', 'BUTTONS');

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public cepService: CepService,
    public dialogRef: MatDialogRef<Publisher2DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  @ViewChild("number") numberInputField!: ElementRef;
  //@ViewChild("nationalId") nationalIdInputField!: ElementRef;

  ngOnInit() {

    let ultimoId: number = 0;

    if (this.data) {
      if (typeof this.data == 'number') {
        ultimoId = this.data;
        this.data = undefined;
      }
    }

    this.form = this.formBuilder.group({
      Id: [this.data?.Id ?? ultimoId],
      NationalId: this.formBuilder.control({ value: this.data?.NationalId ?? '', disabled: false }, GenericValidator.isValidCpf()),
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
      this.actionBtn = this.dataService.getTranslation('UPDATE', 'BUTTONS');;
    }

    // if (this.nationalIdInputField) {
    //   this.nationalIdInputField.nativeElement.setSelectionRange(0, 0);
    //   this.nationalIdInputField.nativeElement.focus();
    // }
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

  states = PublisherDB.getStates(this.environLang);

  groups = PublisherDB.getGroups(this.defaultLang);

  genders = PublisherDB.getGenders(this.defaultLang);

  situations = PublisherDB.getSituations(this.defaultLang);

  assignments = PublisherDB.getAssignments(this.defaultLang);

  maritalStatus = PublisherDB.getMaritalStatus(this.defaultLang);

  publisher_validation_messages = this.dataService.getPublisherValidation();
}