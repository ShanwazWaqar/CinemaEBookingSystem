package com.example.service.imple;

import org.springframework.stereotype.Service;

import java.io.File;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class Emailsenderservice {
		
		@Autowired
		private JavaMailSender javaMailSender;
		public void sendemailwithattachment(String toEmail,String body, String subject) throws MessagingException
		{
			
			
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setFrom("Bookmyshow258@gmail.com");
			mimeMessageHelper.setTo(toEmail);
			mimeMessageHelper.setText(body);
			mimeMessageHelper.setSubject(subject);
			
			//FileSystemResource filer= new FileSystemResource(new File(attachement));
			//mimeMessageHelper.addAttachment(filer.getFilename(), filer);
			javaMailSender.send(mimeMessage);
			System.out.println("Mail sent");
		}

	}

