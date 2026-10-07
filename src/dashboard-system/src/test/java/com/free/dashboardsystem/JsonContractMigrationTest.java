package com.free.dashboardsystem;
import com.free.dashboardsystem.models.*;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.json.JsonMapper;
import static org.junit.jupiter.api.Assertions.*;
class JsonContractMigrationTest {
    private final JsonMapper mapper = JsonMapper.builder().build();
    @Test void dashboardAndWidgetCreateRequestsPreserveDefaults() {
        DashboardModel dashboard = mapper.readValue("{\"dashboardName\":\"Test dashboard\"}", DashboardModel.class);
        assertEquals("Test dashboard", dashboard.getDashboardName());
        assertTrue(dashboard.isStatus());
        WidgetModel widget = mapper.readValue("{\"widgetName\":\"Test chart\",\"chartType\":\"line\",\"widgetDataModels\":[]}", WidgetModel.class);
        assertEquals(1, widget.getCols());
        assertEquals(1, widget.getRows());
        assertEquals(1, widget.getX());
        assertEquals(0.0, widget.getFrequency());
        WidgetDataModel data = mapper.readValue("{}", WidgetDataModel.class);
        assertEquals(0.0, data.getTemperatureData());
    }
}
