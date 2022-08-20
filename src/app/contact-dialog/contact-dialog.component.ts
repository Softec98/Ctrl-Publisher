import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../Services/data.service';
import { CepService } from '../Services/cep.service';
import { Utils } from '../Core/Utils/Utils';
import { environment } from 'src/environments/environment';
import { IAuxiliar } from '../Core/Interfaces/IAuxiliar';
import { MediaObserver } from '@angular/flex-layout';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VERSION } from '@angular/material/core';
import { ContactDB } from '../Core/Entities/ContactDB';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {

  isHandset$: Observable<boolean> = this.media.asObservable().pipe(
    map(() =>
      this.media.isActive('xs') ||
      this.media.isActive('sm') ||
      this.media.isActive('lt-md')
    ), tap(() => this.changeDetectorRef.detectChanges()))

  version = VERSION;

  defaultLang: string = this.dataService.getBrowserLang();
  private environLang: string = environment.defaultLang;

  foneMask(numberLength = 9) {
    return {
      guide: true,
      showMask: true,
      mask: numberLength == 9 ? Utils.fone9Mask : Utils.fone8Mask
    }
  }

  form!: FormGroup;
  tab1: string = this.dataService.getTranslation('CONTACT', 'REGISTER');
  actionBtn: string = this.dataService.getTranslation('SAVE', 'BUTTONS');
  states: IAuxiliar[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dataService: DataService,
    public cepService: CepService,
    private media: MediaObserver,
    private changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  @ViewChild("number") numberInputField!: ElementRef;

  private carregarSeletores() {
    const promise = this.dataService.getStates();
    const promises = [promise]
    Promise.allSettled(promises).
      then((results) => results.forEach((result) => console.log(result.status))).
      finally(() => this.atualizarSeletores());
  }

  private atualizarSeletores() {
    this.states = this.dataService.states;
  }

  ngOnInit() {

    this.carregarSeletores();

    let ultimoId: number = 0;

    this.form = this.formBuilder.group({
      Id: [this.data?.contact?.Id ?? this.data?.registros],
      Name: new FormControl(this.data?.contact?.Name ?? '', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z].*[\s\.]*$/)
      ])),
      ZipCode: [this.data?.contact?.ZipCode ?? ''],
      Address: [this.data?.contact?.Address ?? ''],
      Number: [this.data?.contact?.Number ?? ''],
      Complement: [this.data?.contact?.Complement ?? ''],
      Suburb: [this.data?.contact?.Suburb ?? ''],
      State: [this.data?.contact?.State ?? ''],
      City: [this.data?.contact?.City ?? ''],
      Email: [this.data?.contact?.Email ?? '', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      AreaCode: [this.data?.contact?.AreaCode ?? ''],
      PhoneNumber: [this.data?.contact?.PhoneNumber ?? '', Validators.pattern(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/)],
      CellPhone: [this.data?.contact?.CellPhone ?? '', Validators.pattern(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/)],
      Remark: [this.data?.contact?.Remark ?? ''],
      PublisherId: [this.data?.contact?.PublisherId ?? this.data?.publisherId ]
    });

    if (this.data?.contact?.Id) {
      this.actionBtn = this.dataService.getTranslation('UPDATE', 'BUTTONS');
    }
  }

  private focarNoNumero() {
    this.numberInputField.nativeElement.focus();
  }

  async adicionarContato(): Promise<void> {
    if (this.form.valid) {

      if ('save|salvar'.split('|').includes(this.actionBtn.toLowerCase())) {
        await this.dataService.addContact(new ContactDB(this.form.value))
      }
      else {
        await this.dataService.editContact(new ContactDB(this.form.value))
      }

      this.form.reset();

      this.dialogRef.close(this.actionBtn.toLowerCase());
    }
    else {

      console.log("Formulário com erro.");
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

  selectState = this.defaultLang == 'en' ? 'Select a state' : 'Selecione o estado';

  contact_validation_messages = this.dataService.getContactValidation();
}
