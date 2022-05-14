import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calendar'
})
export class CalendarPipe implements PipeTransform {

  transform(value: string | number): string {
    let valorFormatado = value + '';

    return this.formatarCalendar(valorFormatado);
  }

  private formatarCalendar(calendar: string) {
    let ano = calendar.toString().substring(0, 4);
    let mes = Number(calendar.toString().substring(4)) - 1;
    return new Date(Number(ano), mes, 1).toLocaleString('default', { month: 'long' }) + '/' + ano;
  }
}