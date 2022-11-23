package com.example.demo.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.context.annotation.EnableAspectJAutoProxy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import com.example.demo.model.PaymentCard;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@ToString
@Table(name="users")
public class userRegistration {
	
	@Id
    @GeneratedValue
    private int id;
	private String firstname;
	private String email;
	private String password;
	private String phone;
	private String address1;
	private String address2;
	private String city;
	private String state;
	private String country;
	private String zipcode;
	private String promotion;
	private String verificationcode;
	private String activated;
	private String passvercode;
	private String updatedpass;
	private String lastname;
	private String userstatus;
	private String cardnumber;
	private String cardexpirymonth;
	private String cardexpiryyear;
	private String nameoncard;
	public String getCardnumber() {
		return cardnumber;
	}
	public void setCardnumber(String cardnumber) {
		this.cardnumber = cardnumber;
	}
	public String getCardexpirymonth() {
		return cardexpirymonth;
	}
	public void setCardexpirymonth(String cardexpirymonth) {
		this.cardexpirymonth = cardexpirymonth;
	}
	public String getCardexpiryyear() {
		return cardexpiryyear;
	}
	public void setCardexpiryyear(String cardexpiryyear) {
		this.cardexpiryyear = cardexpiryyear;
	}
	public String getNameoncard() {
		return nameoncard;
	}
	public void setNameoncard(String nameoncard) {
		this.nameoncard = nameoncard;
	}
	public String getUserstatus() {
		return userstatus;
	}
	public void setUserstatus(String userstatus) {
		this.userstatus = userstatus;
	}

	/*
	 * @OneToMany(targetEntity = PaymentCard.class,cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name ="cp_fk",referencedColumnName = "id") private
	 * List<PaymentCard> paymentcard;
	 */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getEmail() {
		return email;
	}
	@Override
	public String toString() {
		return "userRegistration [id=" + id + ", firstname=" + firstname + ", email=" + email + ", password=" + password
				+ ", phone=" + phone + ", address1=" + address1 + ", address2=" + address2 + ", city=" + city
				+ ", state=" + state + ", country=" + country + ", zipcode=" + zipcode + ", promotion=" + promotion
				+ ", verificationcode=" + verificationcode + ", activated=" + activated + ", passvercode=" + passvercode
				+ ", updatedpass=" + updatedpass + ", lastname=" + lastname + ", paymentcard="  + "]";
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress1() {
		return address1;
	}
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	public String getAddress2() {
		return address2;
	}
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public String getPromotion() {
		return promotion;
	}
	public void setPromotion(String promotion) {
		this.promotion = promotion;
	}
	public String getVerificationcode() {
		return verificationcode;
	}
	public void setVerificationcode(String verificationcode) {
		this.verificationcode = verificationcode;
	}
	public String getActivated() {
		return activated;
	}
	public void setActivated(String activated) {
		this.activated = activated;
	}
	public String getPassvercode() {
		return passvercode;
	}
	public void setPassvercode(String passvercode) {
		this.passvercode = passvercode;
	}
	public String getUpdatedpass() {
		return updatedpass;
	}
	public void setUpdatedpass(String updatedpass) {
		this.updatedpass = updatedpass;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	/*
	 * public List<PaymentCard> getPaymentcard() { return paymentcard; }
	 */

	/*
	 * public void setPaymentcard(List<PaymentCard> paymentcard) { this.paymentcard
	 * = paymentcard; }
	 */
	public userRegistration(int id, String firstname, String email, String password, String phone, String address1,
			String address2, String city, String state, String country, String zipcode, String promotion,
			String verificationcode, String activated, String passvercode, String updatedpass, String lastname,String userstatus,String cardnumber,String cardexpirymonth,String cardexpiryyear,String nameoncard) {
		super();
		this.id = id;
		this.firstname = firstname;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipcode = zipcode;
		this.promotion = promotion;
		this.verificationcode = verificationcode;
		this.activated = activated;
		this.passvercode = passvercode;
		this.updatedpass = updatedpass;
		this.lastname = lastname;
		//this.paymentcard = paymentcard;
		this.userstatus= userstatus;
		this.cardnumber=cardnumber;
		this.cardexpirymonth=cardexpirymonth;
		this.cardexpiryyear=cardexpiryyear;
		this.nameoncard=nameoncard;
	}
	public userRegistration() {
		super();
		// TODO Auto-generated constructor stub
	}

	/*
	 * private String cardnumber; private String cardexpirymonth; private String
	 * cardexpiryyear; private String nameoncard;
	 */
	/*
	 * public String getCardnumber() { return cardnumber; } public void
	 * setCardnumber(String cardnumber) { this.cardnumber = cardnumber; } public
	 * String getCardexpirymonth() { return cardexpirymonth; } public void
	 * setCardexpirymonth(String cardexpirymonth) { this.cardexpirymonth =
	 * cardexpirymonth; } public String getCardexpiryyear() { return cardexpiryyear;
	 * } public void setCardexpiryyear(String cardexpiryyear) { this.cardexpiryyear
	 * = cardexpiryyear; } public String getNameoncard() { return nameoncard; }
	 * public void setNameoncard(String nameoncard) { this.nameoncard = nameoncard;
	 * }
	 */
	
}
