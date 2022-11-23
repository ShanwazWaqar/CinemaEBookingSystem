package com.example.service;

import com.example.demo.model.PaymentCard;
import com.example.excepion.IdNotFoundException;

import java.util.List;

import org.springframework.web.bind.annotation.ResponseBody;

public interface PaymentService {
	/*
	 * @ResponseBody List<PaymentCard> getPaymentsById(int id) throws
	 * IdNotFoundException;
	 */
	public void save(PaymentCard card);
}
