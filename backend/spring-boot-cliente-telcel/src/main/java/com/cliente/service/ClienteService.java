package com.cliente.service;

import java.util.List;
import java.util.Optional;

import com.cliente.modelo.Cliente;

public interface ClienteService {
	public List<Cliente>listarClientes();
	public Optional<Cliente>getClienteId(int id);
	public Cliente saveCliente( Cliente cliente);
	public void deteleCliente(int id);

}
