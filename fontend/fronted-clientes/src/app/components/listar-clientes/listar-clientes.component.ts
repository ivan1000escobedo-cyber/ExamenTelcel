import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../Models/Cliente';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent {
   clientes : Cliente[] = [];

  constructor(private clienteService : ClientesService, private router:Router){}

  ngOnInit():void{
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.clienteService.listar().subscribe(data=>{
      this.clientes = data;
    });
  }

  agregar(){
    this.router.navigate(['/agregar']);
  }

  editar(id:number){
    this.router.navigate(['/editar', id]);
  }
   eliminar(id:number) :void{
    if(confirm('Realmente desea eliminar a la cliente?')){
      this.clienteService.eliminar(id).subscribe({
        next:()=>{
          alert('cliente eliminada correctamente');
          this.obtenerClientes(); //REFRESH LA LISTA DE PERSONAS
        },
        error: err =>{
          console.error(err);
          alert('Error al eliminar a cliente');
        }
      });
    }
  }
}



