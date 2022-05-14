import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaObserver } from '@angular/flex-layout';
import { Observable  } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { VERSION } from '@angular/material/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})

export class ReportListComponent implements OnInit {

  isHandset$: Observable<boolean> = this.media.asObservable().pipe(
    map(
      () =>
        this.media.isActive('xs') ||
        this.media.isActive('sm') ||
        this.media.isActive('lt-md')
    ),
    tap(() => this.changeDetectorRef.detectChanges()))
  
  version = VERSION;

  constructor(private dataService: DataService, 
    private builder: FormBuilder,
    private media: MediaObserver,
    private changeDetectorRef: ChangeDetectorRef) { }

  formAno: FormGroup = this.builder.group({
    Ano: [0, Validators.required]
  });

  compets: any = [];
  anos: any = [];
  ano: number = 0;
  step = 0;
  expandir: boolean = false;

  setStep(index: number) {
    this.expandir = true;
    this.step = index;
  }

  nextStep() {
    this.expandir = true;
    this.step++;
  }

  prevStep() {
    this.expandir = true;
    this.step--;
  }

  async ngOnInit(): Promise<void> {
    this.isHandset$.subscribe(isHandset => console.log(isHandset));
    this.anos = await this.dataService.getYears();
    if (this.ano == 0)
      this.ano = this.anos[0].year! ?? new Date().getFullYear();

    this.formAno.patchValue({
      Ano: [this.ano, Validators.required]
    });
    this.recarregarAno();
  }

  async aoMudarAno(e: Event) {
    this.ano = this.formAno.controls['Ano'].value;
    this.recarregarAno();
  }

  private async recarregarAno(): Promise<void> {
    if (this.ano > 0) {
      this.compets = await this.dataService.getMonthsOfYear(this.ano);
      if (this.step !== 0)
        this.expandir = true;
    }
  }

  mostrarCalendar: boolean = false;
  gerirCalendar() {
    this.mostrarCalendar = !this.mostrarCalendar;
  }
}