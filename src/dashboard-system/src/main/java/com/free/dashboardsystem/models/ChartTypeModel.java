package com.free.dashboardsystem.models;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ChartTypeModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(onConstructor_ = @JsonCreator)
@EqualsAndHashCode
public class ChartTypeModel {

    @Id
    private String id;

    private String newChartType;
}
