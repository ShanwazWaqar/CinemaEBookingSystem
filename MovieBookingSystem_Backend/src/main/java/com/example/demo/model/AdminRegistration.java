package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.context.annotation.EnableAspectJAutoProxy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@ToString
@Table(name="admin")

public class AdminRegistration {
	
	@Id
	@GeneratedValue
	private int id;
	
	private String password;
	
	private String email;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public AdminRegistration(int id, String password, String email) {
		super();
		this.id = id;
		this.password = password;
		this.email = email;
	}

	public AdminRegistration() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}

