import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../Services/data.service';
import { Observable, of } from 'rxjs';
import { FormGroup, 
  FormControl, 
  AbstractControl, 
  AsyncValidatorFn, 
  ValidationErrors } from '@angular/forms';
import { Publisher } from '../Core/Entities/Publisher';

@Component({
  selector: 'app-publisher-dialog',
  templateUrl: './publisher-dialog.component.html',
  styleUrls: ['./publisher-dialog.component.scss']
})
export class PublisherDialogComponent implements OnInit {
  
  form!: FormGroup;

  placeholder_batism!: string;
  placeholder_birth!: string;

  mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };  

  publisher = new Publisher();

  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<PublisherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService
  ) { }

  addValidator() {
    this.form.controls['name'].setAsyncValidators([this.isValidName(), this.isValidNameNotInList()]);
  }

  isValidName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      let bReturn: boolean = true;
      if (this.form.controls['name'].value == '') {
        bReturn = false;
      }
      let err: ValidationErrors = { 'invalid': true };
      return bReturn ? of(null) : of(err);
    };
  }

  isValidNameNotInList(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      let bReturn: boolean = true;
      if (this.form.controls['name'].value == 'test@test.test') {
        bReturn = false;
      }
      let err: ValidationErrors = { 'exists': true };
      return bReturn ? of(null) : of(err);
    };
  }

  ngOnInit(): void {
    this.placeholder_batism = "Data de batismo";
    this.placeholder_birth = "Data de nascimento";

    this.form = new FormGroup({
      'name': new FormControl('')
    });

    this.addValidator();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    this.dialogRef.close();
    this.event.emit({data: this.publisher});
    this.publisher.Id = 0; //await this.dataService.dataLength();
  }
}