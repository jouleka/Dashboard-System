package com.free.dashboardsystem.repos;

import com.free.dashboardsystem.models.DashboardModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DashboardRepository extends MongoRepository<DashboardModel, String> {
}
