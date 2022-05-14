import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-diretiva-verso',
  templateUrl: './diretiva-verso.component.html',
  styleUrls: ['./diretiva-verso.component.css']
})
export class DiretivaVersoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DiretivaVersoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.data.action == 'download') {
      this.downloadDiretiva('verso');
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