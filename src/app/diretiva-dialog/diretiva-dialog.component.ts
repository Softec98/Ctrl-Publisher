import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SpinnerOverlayService } from '../Services/spinner-overlay-service';

@Component({
  selector: 'app-diretiva-dialog',
  templateUrl: './diretiva-dialog.component.html',
  styleUrls: ['./diretiva-dialog.component.scss']
})
export class DiretivaDialogComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup!: any;
  tabName: string = "frente";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private readonly spinner: SpinnerOverlayService) { }

  ngOnInit(): void {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tabName = tabChangeEvent.tab.textLabel.toLowerCase();
    console.log(this.tabName);
  }

  print(acao: string = 'print'): void {
    this.spinner.show();
    let DATA: any = document.getElementById(this.tabName);
    html2canvas(DATA, { scale: 1.5, useCORS: true })
      .then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')

        //let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
        // let pdfWidth = pdf.internal.pageSize.getWidth() * .8;
        // let pdfHeight = pdf.internal.pageSize.getHeight()* .8;

        let pdf = new jsPDF('p', 'mm', 'a4');
        let pdfWidth = 208;
        let pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);

        if (acao == 'download') {
          pdf.save(`diretiva-${this.tabName}.pdf`);
        }
        else {
          window.open(URL.createObjectURL(pdf.output("blob")), '_blank');
        }
        this.spinner.hide();
      });
  }
}