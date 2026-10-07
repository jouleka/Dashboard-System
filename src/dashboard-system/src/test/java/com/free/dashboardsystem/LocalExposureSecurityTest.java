package com.free.dashboardsystem;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.tomcat.servlet.TomcatServletWebServerFactory;
import org.springframework.core.env.Environment;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = "spring.data.mongodb.auto-index-creation=false")
class LocalExposureSecurityTest {
    @Autowired Environment environment;
    @Autowired TomcatServletWebServerFactory serverFactory;
    private final HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5)).build();

    @org.springframework.test.context.bean.override.mockito.MockitoBean
    com.free.dashboardsystem.repos.WidgetRepository widgets;
    @org.springframework.test.context.bean.override.mockito.MockitoBean
    com.free.dashboardsystem.services.WidgetService widgetService;
    private HttpResponse<String> request(String method, String path, String origin, String requestedMethod)
            throws Exception {
        String port = environment.getRequiredProperty("local.server.port");
        HttpRequest.Builder builder = HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + port + path))
                .timeout(Duration.ofSeconds(5)).method(method, HttpRequest.BodyPublishers.noBody());
        if (origin != null) builder.header("Origin", origin);
        if (requestedMethod != null) builder.header("Access-Control-Request-Method", requestedMethod);
        return client.send(builder.build(), HttpResponse.BodyHandlers.ofString());
    }

    @Test void mainConfigurationBindsTheRealServerFactoryToLoopback() {
        assertEquals("127.0.0.1", environment.getRequiredProperty("server.address"));
        assertNotNull(serverFactory.getAddress());
        assertTrue(serverFactory.getAddress().isLoopbackAddress());
        assertEquals("127.0.0.1", serverFactory.getAddress().getHostAddress());
    }

    @ParameterizedTest
    @ValueSource(strings = {"http://localhost:4200", "http://127.0.0.1:4200"})
    void legitimateLocalFrontendPreflightWorks(String origin) throws Exception {
        HttpResponse<String> response = request("OPTIONS", "/api/dashboard/list", origin, "GET");
        assertEquals(200, response.statusCode());
        assertEquals(origin, response.headers().firstValue("Access-Control-Allow-Origin").orElse(null));
        assertTrue(response.headers().firstValue("Access-Control-Allow-Credentials").isEmpty());
    }

    @ParameterizedTest
    @ValueSource(strings = {"https://attacker.example", "null"})
    void arbitraryAndOpaqueSitePreflightsAreRejected(String origin) throws Exception {
        HttpResponse<String> response = request("OPTIONS", "/api/dashboard/list", origin, "GET");
        assertEquals(403, response.statusCode());
        assertTrue(response.headers().firstValue("Access-Control-Allow-Origin").isEmpty());
    }

    @Test void foreignSimpleReadRequestIsRejectedBeforeTheDatabase() throws Exception {
        assertEquals(403, request("GET", "/api/dashboard/list", "https://attacker.example", null).statusCode());
    }

    @ParameterizedTest
    @ValueSource(strings = {"http://localhost:4200", "http://127.0.0.1:4200"})
    void legitimateSocketOriginsWork(String origin) throws Exception {
        HttpResponse<String> response = request("GET", "/socket/info", origin, null);
        assertEquals(200, response.statusCode());
        assertEquals(origin, response.headers().firstValue("Access-Control-Allow-Origin").orElse(null));
    }

    @Test void foreignSocketOriginIsRejected() throws Exception {
        assertEquals(403, request("GET", "/socket/info", "https://attacker.example", null).statusCode());
    }

    @ParameterizedTest
    @ValueSource(strings = {"/notify", "/widgetdata", "/api/widget-controller/list/widget/dashboard"})
    void manualBroadcastsRequireLocalPostAndRetainTheirBehavior(String path) throws Exception {
        assertEquals(405, request("GET", path, null, null).statusCode());
        assertEquals(200, request("POST", path, "http://localhost:4200", null).statusCode());
        assertEquals(403, request("POST", path, "https://attacker.example", null).statusCode());
    }
}
