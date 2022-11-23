package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@ToString
@Table(name = "showroom")
public class ShowRoom {
	public ShowRoom() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ShowRoom(int id, String sroom) {
		super();
		this.id = id;
		this.sroom = sroom;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSroom() {
		return sroom;
	}
	public void setSroom(String sroom) {
		this.sroom = sroom;
	}
	@Id
	@GeneratedValue
	private int id;
	private String sroom;
}
