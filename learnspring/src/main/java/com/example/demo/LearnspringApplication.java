package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.controller.UserController;
import com.example.demo.model.userRegistration;
import com.example.demo.repo.UserRepo;

@SpringBootApplication(scanBasePackages={"com.example"})
public class LearnspringApplication {

	public static void main(String[] args) {
		SpringApplication.run(LearnspringApplication.class, args);
		//System.out.println("console output file -------- > LearnspringApplication.java");
	}
	
	/*
	 * @EnableWebSecurity
	 * 
	 * @AllArgsConstructor
	 * 
	 * public class SecurityConfig extends WebSecurityConfigurerAdapter {
	 * 
	 * @Override public void configure(HttpSecurity httpSecurity) throws Exception{
	 * httpSecurity.csrf().disable() .authorizeRequests()
	 * .antMatchers("/api1/**").permitAll() .antMatchers("/api2/**").permitAll()
	 * .antMatchers("/api3/**").permitAll()
	 * 
	 * } `
	 */

	@Configuration
	@EnableWebMvc
	public class WebConfig implements WebMvcConfigurer {

	    @Override
	    public void addCorsMappings(CorsRegistry corsRegistry) {
	        corsRegistry.addMapping("/**")
	                .allowedOrigins("http://localhost:4200")
	                .allowedMethods("*")
	                .maxAge(3600L)
	                .allowedHeaders("*")
	                .exposedHeaders("Authorization")
	                .allowCredentials(true);
	    }

}}
