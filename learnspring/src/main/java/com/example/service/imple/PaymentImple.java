package com.example.service.imple;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.repo.PaymentRepo;
import java.util.List;
import java.util.Optional;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.demo.repo.*;
import com.example.demo.model.PaymentCard;
import com.example.demo.model.userRegistration;
import com.example.excepion.IdNotFoundException;
import com.example.service.PaymentService;

@Service
public class PaymentImple implements PaymentService {
	@Autowired
	PaymentRepo PaymentRepo;
	
	// the id parameter is the foreign key to the user
	//@Override
	/*
	 * @ResponseBody public List<PaymentCard> getPaymentsById(int id) throws
	 * IdNotFoundException { List<PaymentCard> cards = PaymentRepo.findByid(id); if
	 * (cards.isEmpty()) throw new IdNotFoundException("Sorry user with " + id +
	 * " not found!"); return cards; }
	 */
	
	@Override
	public void save(PaymentCard card) {
		PaymentRepo.save(card);
	}
}
