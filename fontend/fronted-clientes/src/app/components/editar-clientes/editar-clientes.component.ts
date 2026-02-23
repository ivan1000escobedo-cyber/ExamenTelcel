import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../Models/Cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-editar-clientes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.css'
})
export class EditarClientesComponent {

   cliente: Cliente = {id: 0, nombre: '', apellidop: '' ,apellidom: '' ,fecha: null ,celular: '' ,correo: '',nss: '' ,curp: ''};

  constructor(private route:ActivatedRoute, private router: Router, private clienteSevice:ClientesService){}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        console.log('ID recibido:', id); // ✅ verifica que llega el id
        if (id > 0) {
            this.clienteSevice.obtenerPorId(id).subscribe({
                next: data => {
                    console.log('Datos recibidos:', data); // ✅ verifica que llegan datos
                    this.cliente = data;
                    this.isLoaded = true;
                },
                error: err => {
                    console.error('Error al cargar:', err); // ✅ muestra el error
                }
            });
        }
    });
  }

  isLoaded = false;

  actualizar():void{
    if (!this.isLoaded) {
        alert('Cargando datos, por favor espera');
        return;
    }
    if (!this.cliente.correo) {
        alert('El correo no puede estar vacío');
        return;
    }
    this.clienteSevice.actualizar(this.cliente.id, this.cliente).subscribe({
        next: () => {
            alert('Correo actualizado correctamente');
            this.router.navigate(['/']);
        },
        error: err => {
            console.error(err);
            alert('Error al actualizar: ' + err.status);
        }
    });
  }

}
