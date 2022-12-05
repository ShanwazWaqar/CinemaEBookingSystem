package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.UpcomingShow;

public interface UpcomingShowRepo extends JpaRepository<UpcomingShow,String> {

}
