import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputError'
})
export class InputErrorPipe implements PipeTransform {

 transform(value: any): string {
        let rvalue: string = '';
        if (value !== null) {
            if (value['invalid'] == true) {
                rvalue = 'ERROR.INVALID';
            }
            if (value['exists'] == true) {
                rvalue = 'ERROR.EXISTS';
            }
        }
        return rvalue;
    }

}