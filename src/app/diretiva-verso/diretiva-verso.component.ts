import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-diretiva-verso',
  templateUrl: './diretiva-verso.component.html',
  styleUrls: ['./diretiva-verso.component.css']
})
export class DiretivaVersoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DiretivaVersoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }
}