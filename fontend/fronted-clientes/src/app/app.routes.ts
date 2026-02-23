import { Routes } from '@angular/router';
import { ListarClientesComponent } from './components/listar-clientes/listar-clientes.component';
import { AgregarClientesComponent } from './components/agregar-clientes/agregar-clientes.component';
import { EditarClientesComponent } from './components/editar-clientes/editar-clientes.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },                                          // ✅ login público
  { path: '', component: ListarClientesComponent, canActivate: [AuthGuard] },            // ✅ protegida
  { path: 'agregar', component: AgregarClientesComponent, canActivate: [AuthGuard] },   // ✅ protegida
  { path: 'editar/:id', component: EditarClientesComponent, canActivate: [AuthGuard] }, // ✅ protegida
  { path: '**', redirectTo: '/login', pathMatch: 'full' }      
];
