import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../Models/Cliente';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css'
})
export class AgregarClientesComponent {

  
  cliente : Cliente = { id: 0, nombre: '', apellidop: '' ,apellidom: '' ,fecha: null ,celular: '' ,correo: '',nss: '' ,curp: ''};

  constructor(private clienteService: ClientesService, private router:Router) { }

  guardar(){
        this.clienteService.agregar(this.cliente).subscribe({
      next: () => {
        alert('Cliente guardado correctamente');
        this.router.navigate(['/']);
      },
      error: err => {
        console.error(err);
        alert('Error al guardar: ' + err.status);
      }
    });

  }

}
