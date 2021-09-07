package com.free.dashboardsystem.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Document(collection = "DashboardModel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DashboardModel {

    @Id
    private String id;

    @NonNull
    @Indexed(unique = true)
    private String dashboardName;

    private String dashboardDescription;

//    @NonNull
    private LocalDateTime date = null;
    private boolean status = true;

//    private String dashboardLogo;

//    private List<String> widgetModelList;
}
