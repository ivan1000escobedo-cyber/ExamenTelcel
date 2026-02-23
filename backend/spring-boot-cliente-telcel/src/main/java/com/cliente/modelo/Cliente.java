package com.cliente.modelo;

import java.sql.Date;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CLIENTE")
@Data
public class Cliente {
	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "NOMBRE")
	private String nombre;
	@Column(name = "APELLIDOP")
	private String apellidop;
	@Column(name = "APILLIDOM")
	private String apellidom;
	@Column(name = "FECHA")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate fecha;
	@Column(name = "CELULAR")
	private String celular;
	@Column(name = "CORREO")
	private String correo;
	@Column(name = "NSS")
	private String nss;
	@Column(name = "CURP")
	private String curp;
	

}
