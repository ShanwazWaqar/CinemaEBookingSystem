package com.example.demo.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name="paymentcard")
public class PaymentCard {
	
	@Id
	@GeneratedValue
	private int cardid;
	private String cardnumber;
	private int expirymonth;
	private int expiryyear;
	private String nameoncard;
	private String old_data;
	private String email;
	
	/*
	 * @ManyToOne(cascade= CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "id") private userRegistration paymentcard;
	 */
	
	public String getOld_data() {
		return old_data;
	}
	public void setOld_data(String old_data) {
		this.old_data = old_data;
	}
	public PaymentCard() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getNameoncard() {
		return nameoncard;
	}
	public void setNameoncard(String nameoncard) {
		this.nameoncard = nameoncard;
	}
	public PaymentCard(int cardid, String cardnumber, int expirymonth, int expiryyear,String nameoncard,String old_data,String email) {
		super();
		
		this.cardid = cardid;
		
		this.cardnumber = cardnumber;
		this.expirymonth = expirymonth;
		this.expiryyear = expiryyear;
		this.nameoncard=nameoncard;
		this.old_data=old_data;
		this.email=email;
		
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "PaymentCard [cardid=" + cardid  + ", cardnumber=" + cardnumber + ", expirymonth="
				+ expirymonth + ", expiryyear=" + expiryyear + "]";
	}
	public int getCardid() {
		return cardid;
	}
	public void setCardid(int cardid) {
		this.cardid = cardid;
	}

	
	 
	public String getCardnumber() {
		return cardnumber;
	}
	public void setCardnumber(String cardnumber) {
		this.cardnumber = cardnumber;
	}
	public int getExpirymonth() {
		return expirymonth;
	}
	public void setExpirymonth(int expirymonth) {
		this.expirymonth = expirymonth;
	}
	public int getExpiryyear() {
		return expiryyear;
	}
	public void setExpiryyear(int expiryyear) {
		this.expiryyear = expiryyear;
	}
	// id is the foreign key to the user that this card belongs to
	
	
}
