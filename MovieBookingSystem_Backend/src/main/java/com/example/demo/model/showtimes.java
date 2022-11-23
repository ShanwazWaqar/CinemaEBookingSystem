package com.example.demo.model;

import java.sql.Date;
import java.sql.Time;

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
@Table(name = "showtimes")
public class showtimes {
	
	public showtimes() {
		super();
		// TODO Auto-generated constructor stub
	}
	public showtimes(int id, String showroomid, int movieid, String moviename, Date date, String time) {
		super();
		this.id = id;
		this.showroomid = showroomid;
		this.movieid = movieid;
		this.moviename = moviename;
		this.date = date;
		this.time = time;
	}
	@Id
	@GeneratedValue
	private int id;
	private String showroomid;
	private int movieid;
	private String moviename;
	private Date date;
	private String time;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getShowroomid() {
		return showroomid;
	}
	public void setShowroomid(String showroomid) {
		this.showroomid = showroomid;
	}
	public int getMovieid() {
		return movieid;
	}
	public void setMovieid(int movieid) {
		this.movieid = movieid;
	}
	public String getMoviename() {
		return moviename;
	}
	public void setMoviename(String moviename) {
		this.moviename = moviename;
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
}