package com.free.dashboardsystem.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "WidgetFrequenceValueModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class WidgetFrequenceValueModel {

    private Double value;
    private Integer frequency;
}
