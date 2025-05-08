import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      surname1: ['', Validators.required],
      surname2: ['', Validators.required],
      birthday: ['', Validators.required],
      id_rol: [2, Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const {
        userName, password, confirmPassword,
        name, surname1, surname2, birthday, id_rol
      } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.registerForm.setErrors({ passwordMismatch: true });
        return;
      }

      const requestBody: User = {
        User_name: userName,
        Password: password,
        Name: name,
        Surname1: surname1,
        Surname2: surname2,
        Birthday: birthday,
        Id_rol: id_rol
      };

      this.authService.register(requestBody).subscribe({
        next: (res) => console.log("Registro exitoso", res),
        error: (err) => console.error("Error en el registro", err)
      });
    }
  }
}
