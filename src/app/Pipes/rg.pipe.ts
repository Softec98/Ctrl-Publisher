import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rg'
})
export class RgPipe implements PipeTransform {

  transform(value: string | number,
    ocultarAlgunsValores: boolean = false): string {
    let valorFormatado = value + '';

    valorFormatado = valorFormatado
      .trim()
      .replace(
        /(\d{2})(\d{3})(\d{3})(\d{1}|X|x)/,
        '$1.$2.$3-$4'
      );

    if (ocultarAlgunsValores) {
      valorFormatado = 'XXX.' + valorFormatado.substr(4, 7) + '-XX';
    }

    return valorFormatado;
  }
}
