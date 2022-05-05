import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DataService } from '../Services/data.service';

const noop = () => { };

@Component({
  selector: 'app-legal-representative',
  templateUrl: './legal-representative.component.html',
  styleUrls: ['./legal-representative.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LegalRepresentativeComponent),
      multi: true,
    }
  ]
})
export class LegalRepresentativeComponent implements ControlValueAccessor, OnInit {

  defaultLang: string = environment.defaultLang.substring(0, 2);

  @Input() label: string = '';
  @Input() listaExclusao: string = '0';
  innerValue: number = 0;
  _number = new FormControl(this.innerValue);

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: number) => void = noop;

  constructor(public dataService: DataService) { }

  legalRepresentatives!: any;

  get value(): number {
    return this.innerValue;
  };

  set value(v: number) {
    this.innerValue = v;
    this._number = new FormControl(this.innerValue);
  }

  writeValue(value: number): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this._number = new FormControl(this.innerValue);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onChange(event: any) {
    this.value = event;
    this.onBlur();
  }

  onBlur() {
    this.onChangeCallback(this.innerValue);
  }

  async ngOnInit(): Promise<void> {
    // let numeros: number[] = [];
    // this.listaExclusao.split(',').forEach(numero => { numeros.push(Number(numero)) })
    let numeros = [...this.listaExclusao.split(',')].map(numero => Number(numero))

    await this.updatelegalRepresentatives(numeros);
  }

  private async updatelegalRepresentatives(numeros: number[]) {
    this.legalRepresentatives = await this.dataService.getLegalRepresentatives(numeros);
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (typeof changes['listaExclusao'].previousValue != 'undefined') {
      await this.updatelegalRepresentatives(changes['listaExclusao'].currentValue)
      console.log('Legal 1: ' + changes['listaExclusao'].currentValue);
    }
  }

  selectLegalRepresentative = this.defaultLang == 'en' ? 'Select a legal representative' : 'Selecione o procurador';
}