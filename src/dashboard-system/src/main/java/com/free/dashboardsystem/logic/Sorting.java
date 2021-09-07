package com.free.dashboardsystem.logic;

import com.free.dashboardsystem.models.DashboardModel;

import java.util.Comparator;

public class Sorting implements Comparator<DashboardModel> {


    @Override
    public int compare(DashboardModel o1, DashboardModel o2) {
        return o2.getDate().compareTo(o1.getDate());
    }
}
