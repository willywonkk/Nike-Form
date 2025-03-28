import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
   { path: '', component: HomeComponent  },
   { path: 'products', component: ProductsComponent  },
   { path: 'form', component: FormComponent  },
   { path: 'login', component: LoginComponent  },
   { path: 'register', component: RegisterComponent  }
];
