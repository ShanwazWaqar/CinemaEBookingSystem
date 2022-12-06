package com.example.demo.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.boot.context.properties.bind.DefaultValue;

import lombok.AllArgsConstructor;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@ToString
@Table(name = "showseats")
public class showseats {
	
	@Override
	public String toString() {
		return "showseats [id=" + id + ", seatnumber=" + seatnumber + ", date=" + date + ", time=" + time
				+ ", screennumber=" + screennumber + ", seatoccupancy=" + seatoccupancy + "]";
	}
	public showseats() {
		super();
		// TODO Auto-generated constructor stub
	}
	public showseats(int id, String seatnumber, int screennumber,int seatoccupancy,Date date,String time) {
		super();
		this.id = id;
		this.seatnumber = seatnumber;
		this.screennumber = screennumber;
		this.seatoccupancy=seatoccupancy;
		this.date=date;
		this.time=time;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	@Id
	@GeneratedValue
	private int id;
	private String seatnumber;
	private Date date;
	private String time;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSeatnumber() {
		return seatnumber;
	}
	public void setSeatnumber(String seatnumber) {
		this.seatnumber = seatnumber;
	}
	public int getScreennumber() {
		return screennumber;
	}
	public void setScreennumber(int screennumber) {
		this.screennumber = screennumber;
	}
	public int getSeatoccupancy() {
		return seatoccupancy;
	}
	public void setSeatoccupancy(int seatoccupancy) {
		this.seatoccupancy = seatoccupancy;
	}
	private int screennumber;
	@Column(columnDefinition = "integer default 0")
	private int seatoccupancy;

}
