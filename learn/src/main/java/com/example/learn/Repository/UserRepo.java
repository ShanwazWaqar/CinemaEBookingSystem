package com.example.learn.Repository;
import java.util.Optional;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;


import com.example.learn.entity.userdata;
@EnableJpaRepositories("learn.example.com")
@EntityScan("entity.learn.example.com")
@Repository
public interface UserRepo extends JpaRepository<userdata,Long> {
	Optional<userdata> findByEmail(String email);

	Boolean existsByEmailAndPassword(String email, String password);
}
