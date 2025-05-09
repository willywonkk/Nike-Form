import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../service/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importa HttpClientTestingModule

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule],  // Asegúrate de incluir HttpClientTestingModule
      providers: [AuthService]  // Si usas AuthService, asegúrate de incluirlo en providers
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
