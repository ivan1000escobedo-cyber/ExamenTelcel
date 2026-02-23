package com.cliente.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cliente.modelo.Cliente;
import com.cliente.service.ClienteService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;



@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping({"/api/v1/cliente"})
@AllArgsConstructor
public class ClienteController {
	
	@Autowired
	private final ClienteService service;
	
	 @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody Map<String, String> body,
	                                    HttpSession session) {
	        String usuario = body.get("usuario");
	        String password = body.get("password");

	        // Usuario hardcodeado para el examen
	        if ("admin".equals(usuario) && "1234".equals(password)) {
	            session.setAttribute("usuario", usuario); // variable de sesión
	            return ResponseEntity.ok(Map.of(
	                "mensaje", "Login exitoso",
	                "usuario", usuario
	            ));
	        }
	        return ResponseEntity.status(401).body(Map.of("error", "Credenciales incorrectas"));
	    }

	    @PostMapping("/logout")
	    public ResponseEntity<?> logout(HttpSession session) {
	        session.invalidate();
	        return ResponseEntity.ok(Map.of("mensaje", "Sesión cerrada"));
	    }

	    @GetMapping("/verificar")
	    public ResponseEntity<?> verificar(HttpSession session) {
	        Object usuario = session.getAttribute("usuario");
	        if (usuario != null) {
	            return ResponseEntity.ok(Map.of("usuario", usuario));
	        }
	        return ResponseEntity.status(401).body(Map.of("error", "No autenticado"));
	    }
	
	@GetMapping("/listar")
	public ResponseEntity<List<Cliente>>listarClientes(){
		List<Cliente> clientes = (List<Cliente>) service.listarClientes();
		return ResponseEntity.ok(clientes);
	}
	@PostMapping("/agregar")
	public ResponseEntity<Cliente> addCliente(@RequestBody Cliente cliente){
		service.saveCliente(cliente);
		return new ResponseEntity<>(cliente,HttpStatus.CREATED);
		
	}
	@GetMapping("/listar/{id}")
	public ResponseEntity<Cliente> getClienteId(@PathVariable int id){
		Optional<Cliente> clienetes = service.getClienteId(id);
		if(clienetes.isPresent()) {
			return ResponseEntity.ok() .build();
		}
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Cliente> updatecliente(@PathVariable int id, @RequestBody Cliente cliente) {
		cliente.setId(id);
		cliente = service.saveCliente(cliente);
		return new ResponseEntity<>(cliente, HttpStatus.CREATED);
	}
	@DeleteMapping("eliminar/{id}")
	public ResponseEntity<Cliente> deteleClienete(@PathVariable int id){
		Optional<Cliente> clienten = service.getClienteId(id);
		if(clienten.isPresent()) {
			service.deteleCliente(id);
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}

}
