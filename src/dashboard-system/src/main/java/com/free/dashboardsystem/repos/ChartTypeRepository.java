package com.free.dashboardsystem.repos;

import com.free.dashboardsystem.models.ChartTypeModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChartTypeRepository extends MongoRepository<ChartTypeModel, String> {
}
