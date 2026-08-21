package com.sanghee.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    // Vite dev 서버(vite.config.ts의 /api 프록시)를 거치면 사실 필요 없지만,
    // 프록시 없이 프론트(5173)에서 백엔드(8080)를 직접 호출해서 확인할 때를 위해 열어둠
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST");
            }
        };
    }
}
