import { Component, ElementRef, ViewChild, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// declare var require: any;

// import * as pdfMake from "node_modules/pdfmake/build/pdfmake.js";
// import * as pdfFonts from "node_modules/pdfmake/build/vfs_fonts.js";
// const htmlToPdfmake = require("html-to-pdfmake");
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-diretiva-frente',
  templateUrl: './diretiva-frente.component.html',
  styleUrls: ['./diretiva-frente.component.css']
})
export class DiretivaFrenteComponent implements OnInit {

  @ViewChild('frente')
  frente!: ElementRef;

  constructor(public dialogRef: MatDialogRef<DiretivaFrenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  // download_html2canvas(tipo: string): void {
  //   let DATA: any = document.getElementById(tipo);
  //   html2canvas(DATA, { scale: 1.5 }).then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;

  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');

  //     let position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     PDF.save(`diretiva-${tipo}.pdf`);
  //   });
  // }

  // download_pdfMake(): void {
  //   const frente = this.frente.nativeElement;
  //   var html = htmlToPdfmake(frente.innerHTML);
  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).download(); 
  // }
}