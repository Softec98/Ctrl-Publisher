import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})

export class ReportListComponent implements OnInit {

  constructor(private dataService: DataService, private builder: FormBuilder) { }

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
    this.step--;
  }

  prevStep() {
    this.expandir = true;
    this.step++;
  }

  async ngOnInit(): Promise<void> {

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

    if (this.ano > 0)
      this.compets = await this.dataService.getMonthsOfYear(this.ano);
  }
}