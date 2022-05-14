import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-diretiva-frente',
  templateUrl: './diretiva-frente.component.html',
  styleUrls: ['./diretiva-frente.component.css']
})
export class DiretivaFrenteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DiretivaFrenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.data.action == 'download') {
      this.downloadDiretiva('frente');
      this.dialogRef.close();
    }
  }

  downloadDiretiva(tipo: string): void {
    let DATA: any = document.getElementById(tipo);
    html2canvas(DATA, { scale: 1.5 }).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');

      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`diretiva-${tipo}.pdf`);
    });
  }
}