import { Injectable } from '@angular/core';
import { PublisherDB } from '../Core/Entities/PublisherDB';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { db } from '../Core/Entities/ApplicationDB';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public translateService: TranslateService) {

    translateService.addLangs([this.defaultLang, 'en']);

    translateService.setDefaultLang(this.defaultLang);

    translateService.use(this.getBrowserLang());
  }

  lang: string = this.getBrowserLang();

  private defaultLang: string = environment.defaultLang;

  getBrowserLang() {
    const browserLang = this.translateService.getBrowserLang();
    return browserLang?.match(/pt-BR|en/) ? browserLang : this.defaultLang;
  }

  async getPublisher(id: number) {
    return await db.publisher.get(id);
  }

  async getLegalRepresentatives(id: number[]) {
    return await db.publisher.orderBy('Name').filter(x =>
      x.IsLegalRepresentative === true && id.indexOf(x.Id) === -1).toArray();
  }

  async getPublisherById(id: string) {
    return await db.publisher.filter(x => x.NationalId === id).first();
  }

  async getPublishers() {
    return await db.publisher.orderBy('Name').toArray();
  }

  private getMessageLanguage(prefixo: string, campo: string, tipo: string, tam: number = 0, sufixo: string = '') {

    let retorno = { type: '', message: '' };

    switch (this.lang) {

      case 'en':

        switch (tipo) {
          case 'maxlength':
            retorno = { type: tipo, message: `${this.getTranslation(campo)} cannot be more than ${tam} characters long` };
            break;
          case 'minlength':
            retorno = { type: tipo, message: `${this.getTranslation(campo)} must be at least ${tam} characters long` };
            break;
          case 'pattern':
            retorno = { type: tipo, message: `${this.getTranslation(campo)} ${sufixo}` };
            break;
          case 'required':
            retorno = { type: tipo, message: `${this.getTranslation(campo)} is required` };
            break;
        };

        break;

      case 'pt-BR':

        switch (tipo) {
          case 'maxlength':
            retorno = { type: tipo, message: `${prefixo} ${this.getTranslation(campo)} não pode ter mais do que ${tam} caracteres` };
            break;
          case 'minlength':
            retorno = { type: tipo, message: `${prefixo} ${this.getTranslation(campo)} precisa ter no mínimo ${tam} caracteres` };
            break;
          case 'pattern':
            retorno = { type: tipo, message: `${prefixo} ${this.getTranslation(campo)} ${sufixo}` };
            break;
          case 'required':
            retorno = { type: tipo, message: `${prefixo} ${this.getTranslation(campo)} é obrigatári${prefixo.toLowerCase()}` };
            break;
        }

        break;
    }

    return retorno;
  }

  getPublisherValidation() {

    return {
      'nationalId': [
        this.getMessageLanguage('O', 'nationalId', 'minlength', 11),
        this.getMessageLanguage('O', 'nationalId', 'pattern', 0,
          this.getBrowserLang() == 'en' ? 'is invalid' : ' é inválido')
      ],
      'name': [
        this.getMessageLanguage('O', 'name', 'maxlength', 100),
        this.getMessageLanguage('O', 'name', 'minlength', 5),
        this.getMessageLanguage('O', 'name', 'pattern', 0,
          this.getBrowserLang() == 'en' ? 'must contain only letters' : 'deve conter somente letras'),
        this.getMessageLanguage('O', 'name', 'required')
      ],
      'email': [
        this.getMessageLanguage('O', 'email', 'pattern', 0,
          this.getBrowserLang() == 'en' ? 'is invalid' : ' é inválido')
      ],
      'baptismDate': [
        this.getMessageLanguage('A', 'baptismDate', 'required')
      ],
      'birthDate': [
        this.getMessageLanguage('A', 'birthDate', 'required')
      ],
      'gender': [
        this.getMessageLanguage('O', 'gender', 'required')
      ]
    };
  }

  getTranslation(field: string, node?: string) {

    let retorno: string = '';

    node = typeof (node) == 'undefined' ? 'PUBLISHER' : node;

    this.translateService
      .get(`${node}.${field.toUpperCase()}`)
      .subscribe((result: string) => {
        retorno = result;
      });

    return retorno;
  }

  async addPublisher(data: PublisherDB) {

    await db.transaction('rw', db.publisher, function () {
      db.publisher.add(data);
    }).catch(function (err) {
      console.error(err.stack || err);
    });
  }

  async editPublisher(data: PublisherDB) {

    await db.transaction('rw', db.publisher, function () {
      db.publisher.update(data.Id, data);
    }).catch(function (err) {
      console.error(err.stack || err);
    });
  }

  async deletePublisher(id: number) {

    await db.transaction('rw', db.publisher, function () {
      db.publisher.delete(id);
    }).catch(function (err) {
      console.error(err.stack || err);
    });
  }

  async getReports(year: number) {
    let datIni = new Date(`${year}-01-01`);
    let datFim = new Date(`${year}-12-01`);
    return await db.report.where('Calendar').between(datIni, datFim)
      .sortBy('Canledar');
  }
}