import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { db } from '../Core/Entities/ApplicationDB';
import { PublisherDB } from '../Core/Entities/PublisherDB';
import { ReportDB } from '../Core/Entities/ReportDB';
import { CalendarDB } from '../Core/Entities/CalendarDB';
import { IAuxiliar } from "../Core/Interfaces/IAuxiliar";
import { Utils } from '../Core/Utils/Utils';

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

  publishers: any = [];
  calendars: CalendarDB[] = [];
  calendarId!: number;

  assignments: IAuxiliar[] = [];
  groups: IAuxiliar[] = [];
  situations: IAuxiliar[] = [];
  maritalStatus: IAuxiliar[] = [];
  genders: IAuxiliar[] = [];
  states: IAuxiliar[] = [];
  types: IAuxiliar[] = [];

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

  async getCalendars() {
    return await db.calendar.orderBy('Calendar').reverse().toArray();
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

  async getReportsByCalendar(calendar: number) {

    this.calendarId = this.calendars.filter(x => x.Calendar == calendar)[0].Id;

    let summary = new Map<string,
      {
        Id: number,
        name: string,
        type?: string
        videos: number,
        publications: number,
        revisits: number,
        studies: number,
        hours: number
      }>();

    if (this.publishers.length == 0) {
      (await this.getPublishers()).forEach(publisher => {
        this.publishers.push({ Id: publisher.Id, Name: publisher.Name })
      });
    }

    return await db.report.filter(x => x.CalendarId == this.calendarId).each(async report => {
      let type = this.getTypeById(report.TypeId); // ReportDB.getTypes('pt-BR')!.find(x => x.key == report.TypeId)?.value;
      let name = this.getPublisherName(report.PublisherId);
      if (!summary.has(name)) { // report.Id
        summary.set(name, // report.Id
          {
            Id: report.Id,
            name: name,
            type: type,
            videos: report?.Videos! ?? 0,
            publications: report?.Publications! ?? 0,
            revisits: report?.Revisits ?? 0,
            studies: report?.Studies! ?? 0,
            hours: report?.Hours! ?? 0
          });
      }
    }).then(() => {
      //return Array.from(summary.values());
      return Array.from(new Map([...summary.entries()].sort()).values());
    });
  }

  getPublisherName(id: number) {
    const noName = this.lang == 'us' ? '[Publisher not found]' : '[Publicador não encontrado]';
    if (this.publishers.length > 0) {
      return this.publishers.filter(function (x: { Id: number; }) {
        return x.Id === id
      })[0].Name! ?? noName;
    }
    return noName;
  }

  getCalendarCompet(id: number) {
    if (this.calendars.length > 0)
      return this.calendars.filter(x => x.Id == id)[0]?.Calendar! ?? 0;

    return 0;
  }

  async getMonthsOfYear(ano: number) {

    var compets = this.calendars.filter(x => x.Calendar.toString().startsWith(ano.toString()))
      .map(function (calendar) { return calendar.Id; });

    const summary = new Map<number, {
      index: number,
      compet: number,
      month: string,
      year: number,
      amountHours: number,
      publishers: number,
      aux_pioneer: number,
      reg_pioneer: number
    }>();

    let indice = -1;

    return await db.report //.orderBy('Id').reverse()
      .filter(x => compets.includes(x.CalendarId)).each(report => {
        let compet: number = this.getCalendarCompet(report.CalendarId);
        let mes = Number(compet.toString().substring(4)) - 1;
        let ano = Number(compet.toString().substring(0, 4));
        if (summary.has(compet)) {
          summary.get(compet)!.amountHours += report.Hours;
          summary.get(compet)!.publishers += report?.TypeId == 1 ? 1 : 0;
          summary.get(compet)!.aux_pioneer += report?.TypeId == 2 ? 1 : 0;
          summary.get(compet)!.reg_pioneer += report?.TypeId == 3 ? 1 : 0;
        } else {
          indice++;
          summary.set(compet,
            {
              index: indice,
              compet: compet,
              month: new Date(ano, mes, 1).toLocaleString('default', { month: 'long' }),
              year: ano,
              amountHours: report?.Hours ?? 0,
              publishers: report?.TypeId == 1 ? 1 : 0,
              aux_pioneer: report?.TypeId == 2 ? 1 : 0,
              reg_pioneer: report?.TypeId == 3 ? 1 : 0
            })
        }
      }).then(() => {
        return Array.from(new Map([...summary.entries()].sort().reverse()).values());
      });
  }

  async deleteReport(id: number) {

    await db.transaction('rw', db.report, function () {
      db.report.delete(id);
    }).catch(function (err) {
      console.error(err.stack || err);
    });
  }

  async getReport(id: number) {
    return await db.report.get(id);
  }

  async getLastReport(): Promise<number> {
    return await db.report.orderBy('Id').last().then(report => {
      return report?.Id ?? 0;
    });
  }

  async addReport(data: ReportDB) {

    await db.transaction('rw', db.report, function () {
      db.report.add(data);
    }).catch(function (err) {
      console.error(err.stack || err);
    });
  }

  async editReport(data: ReportDB) {

    await db.transaction('rw', db.report, function () {
      db.report.update(data.Id, data);
    }).catch(function (err) {
      console.error(err.stack || err);
    });
  }

  async getYears() {

    const summary = new Map<number, {
      index: number,
      year: number
    }>();

    let indice = -1;

    if (this.calendars.length == 0) {
      this.calendars = await this.getCalendars();
    }

    return await db.calendar.orderBy('Calendar').reverse().each(calendar => {
      let compet: number = calendar.Calendar;
      let ano = Number(compet.toString().substring(0, 4));
      if (!summary.has(ano)) {
        indice++;
        summary.set(ano,
          {
            index: indice,
            year: ano
          })
      }
    }).then(() => {
      return Array.from(summary.values());
    });
  }

  private getLang() {
    if (typeof this.lang == 'undefined') {
      this.lang = this.getBrowserLang();
    }
  }

  async getAssignments(): Promise<void> {
    if (this.assignments.length == 0) {
      this.getLang();
      await Utils.getAuxiliar(`assignment-${this.lang}`).then((aux) => {
        this.assignments = aux;
      });
    }
  }

  getAssignmentById(id: number) {
    this.getAssignments();
    return this.assignments.find(x => x.key == id)?.value!;
  }

  async getGroups(): Promise<void> {
    if (this.groups.length == 0) {
      this.getLang();
      await Utils.getAuxiliar(`group-${this.lang}`).then((aux) => {
        this.groups = aux;
      });
    }
  }

  getGroupById(id: number) {
    this.getGroups();
    return this.groups.find(x => x.key == id)?.value!;
  }

  async getSituations(): Promise<void> {
    if (this.situations.length == 0) {
      this.getLang();
      await Utils.getAuxiliar(`situation-${this.lang}`).then((aux) => {
        this.situations = aux;
      });
    }
  }

  getSituationById(id: number) {
    this.getSituations();
    return this.situations.find(x => x.key == id)?.value!;
  }

  async getMaritalStatus(): Promise<void> {
    if (this.maritalStatus.length == 0) {
      this.getLang();
      await Utils.getAuxiliar(`maritalStatus-${this.lang}`).then((aux) => {
        this.maritalStatus = aux;
      });
    }
  }

  getMaritalStatusById(id: number) {
    this.getMaritalStatus();
    return this.maritalStatus.find(x => x.key == id)?.value!;
  }

  async getGenders(): Promise<void> {
    if (this.genders.length == 0) {
      this.getLang();
      await Utils.getAuxiliar(`gender-${this.lang}`).then((aux) => {
        this.genders = aux;
      });
    }
  }

  getGenderById(id: number) {
    this.getGenders();
    return this.genders.find(x => x.key == id)?.value!;
  }

  async getStates(): Promise<void> {
    if (this.states.length == 0) {
      this.getLang();
      await Utils.getAuxiliar(`state-${this.lang}`).then((aux) => {
        this.states = aux;
      });
    }
  }

  getStateById(id: number) {
    this.getStates();
    return this.states.find(x => x.key == id)?.value!;
  }

  async getTypes(): Promise<void> {
    if (this.types.length == 0) {
      this.getLang();
      await Utils.getAuxiliar(`type-${this.lang}`).then((aux) => {
        this.types = aux;
      });
    }
  }

  getTypeById(id: number) {
    this.getTypes();
    return this.types.find(x => x.key == id)?.value!;
  }
}