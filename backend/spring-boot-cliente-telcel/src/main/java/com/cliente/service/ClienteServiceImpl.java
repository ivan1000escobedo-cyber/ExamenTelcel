package com.cliente.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cliente.modelo.Cliente;
import com.cliente.repository.ClienteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClienteServiceImpl implements ClienteService {
	
	private ClienteRepository repository;

	@Override
	public List<Cliente> listarClientes() {
		// TODO Auto-generated method stub
		return (List<Cliente>)repository.findAll();
	}

	@Override
	public Optional<Cliente> getClienteId(int id) {
		// TODO Auto-generated method stub
		return repository.findById(id);
	}

	@Override
	public Cliente saveCliente(Cliente cliente) {
		repository.save(cliente);
		return cliente;
	}

	@Override
	public void deteleCliente(int id) {
		repository.deleteById(id);
		// TODO Auto-generated method stub
		
	}

}
