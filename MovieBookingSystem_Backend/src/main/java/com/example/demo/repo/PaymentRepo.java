package com.example.demo.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.PaymentCard;
import com.example.demo.model.userRegistration;

@Repository
public interface PaymentRepo extends JpaRepository<PaymentCard,String> {
	List<PaymentCard> findByemail(String email);

	//void save(PaymentCard card);
}
