package com.example.learn.entity;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
//import javax.persistence.Table;

import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@ToString
@Table("geeksdemo")
public class userdata {
	
	 private int id;
	 private String Name;
	 private String gender;
	 private String dept;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	public userdata(int id, String name, String gender, String dept) {
		super();
		this.id = id;
		Name = name;
		this.gender = gender;
		this.dept = dept;
	}
	@Override
	public String toString() {
		return "userdata [id=" + id + ", Name=" + Name + ", gender=" + gender + ", dept=" + dept + "]";
	}
	public userdata() {
		super();
		// TODO Auto-generated constructor stub
	}
	 
}
