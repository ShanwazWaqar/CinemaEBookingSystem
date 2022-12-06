package com.example.demo.model;

import java.util.Date;

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
@Table(name="upcomingshows")
public class UpcomingShow {
	
	@Id
	@GeneratedValue
	private int id;
	
	// Foreign keys
	private int roomid;
	private int movieid;
	
	private int numseatsavailable;
	private Date dateandtime;
	
	
	public UpcomingShow(int id, int roomid, int movieid, int numseatsavailable, Date dateandtime) {
		super();
		this.id = id;
		this.roomid = roomid;
		this.movieid = movieid;
		this.numseatsavailable = numseatsavailable;
		this.dateandtime = dateandtime;
	}
	public UpcomingShow() {
		super();
	}
	@Override
	public String toString() {
		return "UpcomingShow [id=" + id + ", roomid=" + roomid + ", movieid=" + movieid + ", numseatsavailable="
				+ numseatsavailable + ", dateandtime=" + dateandtime + "]";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRoomid() {
		return roomid;
	}
	public void setRoomid(int roomid) {
		this.roomid = roomid;
	}
	public int getMovieid() {
		return movieid;
	}
	public void setMovieid(int movieid) {
		this.movieid = movieid;
	}
	public int getNumseatsavailable() {
		return numseatsavailable;
	}
	public void setNumseatsavailable(int numseatsavailable) {
		this.numseatsavailable = numseatsavailable;
	}
	public Date getDateandtime() {
		return dateandtime;
	}
	public void setDateandtime(Date dateandtime) {
		this.dateandtime = dateandtime;
	}
	
}
