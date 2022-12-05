package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@ToString
@Table(name="promotion")
public class promotion {
	@Id
	@GeneratedValue
	private int pid;
	private String old_pcode;
	private String email;
	private int send_promo;
	public int getSend_promo() {
		return send_promo;
	}
	public void setSend_promo(int send_promo) {
		this.send_promo = send_promo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOld_pcode() {
		return old_pcode;
	}
	public void setOld_pcode(String old_pcode) {
		this.old_pcode = old_pcode;
	}
	public promotion() {
		super();
		// TODO Auto-generated constructor stub
	}
	public promotion(int pid, String pcode, String start, String end, double percentage,String old_pcode,String email,int send_promo) {
		super();
		this.pid = pid;
		this.pcode = pcode;
		this.start = start;
		this.end = end;
		this.percentage = percentage;
		this.old_pcode=old_pcode;
		this.email=email;
		this.send_promo=send_promo;
	}
	@Override
	public String toString() {
		return "promotion [pid=" + pid  + ", pcode=" + pcode + ", start=" + start + ", end=" + end
				+ ", percentage=" + percentage + "]";
	}
	private String pcode;
	private String start;
	private String end;
	private double percentage;
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getPcode() {
		return pcode;
	}
	public void setPcode(String pcode) {
		this.pcode = pcode;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public double getPercentage() {
		return percentage;
	}
	public void setPercentage(double percentage) {
		this.percentage = percentage;
	}
}
