package com.free.dashboardsystem.models;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "WidgetFrequenceValueModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(onConstructor_ = @JsonCreator)
@EqualsAndHashCode
@ToString
public class WidgetFrequenceValueModel {

    private Double value;
    private Integer frequency;
}
