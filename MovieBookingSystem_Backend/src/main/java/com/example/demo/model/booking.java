package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@ToString
@Table(name="booking")
public class booking {
	@Id
	@GeneratedValue
	private int Bid;
	private double ticketcost;
	private double taxes;
	private double totalamount;
	private int numberoftcikets;
	private int seatnumbers;
}
