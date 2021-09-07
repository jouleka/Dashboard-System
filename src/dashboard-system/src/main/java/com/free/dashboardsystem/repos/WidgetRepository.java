package com.free.dashboardsystem.repos;

import com.free.dashboardsystem.models.WidgetDataModel;
import com.free.dashboardsystem.models.WidgetModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WidgetRepository extends MongoRepository<WidgetModel, String> {

}
