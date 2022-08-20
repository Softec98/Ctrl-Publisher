import { ChangeDetectorRef, Component, Inject, OnInit, VERSION, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SpinnerOverlayService } from '../Services/spinner-overlay-service';
import { map, Observable, tap } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-diretiva-dialog',
  templateUrl: './diretiva-dialog.component.html',
  styleUrls: ['./diretiva-dialog.component.scss']
})
export class DiretivaDialogComponent implements OnInit {

  isHandset$: Observable<boolean> = this.media.asObservable().pipe(
    map(() =>
      this.media.isActive('xs') ||
      this.media.isActive('sm') ||
      this.media.isActive('lt-md')
    ), tap(() => this.changeDetectorRef.detectChanges()))

  version = VERSION;

  @ViewChild('tabGroup') tabGroup!: any;
  tabName: string = "frente";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private readonly spinner: SpinnerOverlayService,
    private media: MediaObserver,
    private changeDetectorRef: ChangeDetectorRef) { }

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
        const contentDataURL = canvas.toDataURL('image/pdf')

        //let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
        // let pdfWidth = pdf.internal.pageSize.getWidth() * .8;
        // let pdfHeight = pdf.internal.pageSize.getHeight()* .8;

        let pdf = new jsPDF('p', 'mm', 'a4', true);
        let pdfWidth = 208;
        let pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

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