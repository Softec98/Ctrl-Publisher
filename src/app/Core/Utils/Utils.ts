import { AbstractControl, Validators } from "@angular/forms";
import { IAuxiliar } from "../Interfaces/IAuxiliar";

export class Utils {
    constructor() { }

    static isValidCpf() {
        return (control: AbstractControl): Validators => {
            const cpf = control.value == null ? '' : control?.value.replaceAll('.', '').replaceAll('-', '').replaceAll('_', '');
            if (cpf) {
                let numbers, digits, sum, i, result, equalDigits;
                equalDigits = 1;
                if (cpf.length < 11) {
                    return { cpfNotValid: true };
                }

                for (i = 0; i < cpf.length - 1; i++) {
                    if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                        equalDigits = 0;
                        break;
                    }
                }

                if (!equalDigits) {
                    numbers = cpf.substring(0, 9);
                    digits = cpf.substring(9);
                    sum = 0;
                    for (i = 10; i > 1; i--) {
                        sum += numbers.charAt(10 - i) * i;
                    }

                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(0))) {
                        return { cpfNotValid: true };
                    }
                    numbers = cpf.substring(0, 10);
                    sum = 0;

                    for (i = 11; i > 1; i--) {
                        sum += numbers.charAt(11 - i) * i;
                    }
                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(1))) {
                        return { cpfNotValid: true };
                    }
                    return '';
                } else {
                    return { cpfNotValid: true };
                }
            }
            return '';
        };
    }

    static OnlyNumbers(campo: string) {
        return campo?.match(/\d/g)?.join('')!;
    }

    static cpfMask = {
        guide: true,
        showMask: true,
        mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    };

    static rgMask = {
        guide: true,
        showMask: true,
        mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d|X/]
    };

    static fone8Mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    static fone9Mask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

    static calcAge(date: Date): number {
        if (date) {
            let timeDiff = Math.abs(Date.now() - new Date(date).getTime());
            return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        }
        return 0;
    }

    static async getAuxiliar(arquivo: string) {
        return await fetch(`./assets/data/${arquivo}.json`).then(res => res.json())
            .then(data => {
                return data as IAuxiliar[];
            });
    }
}