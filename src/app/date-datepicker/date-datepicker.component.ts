import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

const noop = () => { };

@Component({
  selector: 'app-date-datepicker',
  templateUrl: './date-datepicker.component.html',
  styleUrls: ['./date-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    }
  ]
})

export class DatePickerComponent implements ControlValueAccessor {

  defaultLang:string = environment.defaultLang.substring(0, 2);

  @Input() label: string = '';
  @Input() hoje: string = '';
  innerValue: any = new Date();
  date = new FormControl(this.innerValue);

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): Date {
    return this.innerValue;
  };

  set value(v: Date) {
    this.innerValue = v;
    this.date = new FormControl(this.innerValue);
  }

  writeValue(value: Date): void {
    if (value !== this.innerValue) {
      this.innerValue = moment(value).utc();
      this.date = new FormControl(this.innerValue);
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

  preencherHoje() {
    this.onChange(new Date())  
  }
}