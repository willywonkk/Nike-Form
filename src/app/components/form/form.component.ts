import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  form = new FormGroup({
    ReferenceNumber: new FormControl(''),
    Name: new FormControl(''),
    Price: new FormControl(''),
    Description: new FormControl(''),
    OnSale: new FormControl(false),
    Type: new FormControl(''),
    Image: new FormControl(null)
  });

  // Mostrar el mensaje de error: helper
  shouldShowError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control?.touched && control?.invalid ? true : false;
  }

  handleSubmit() {
    console.log(this.form.value);
    // Aquí podrías manejar la lógica de lo que quieres hacer con el formulario.
  }

  onReferenceNumberChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.form.patchValue({ ReferenceNumber: input.value });
  }
}
