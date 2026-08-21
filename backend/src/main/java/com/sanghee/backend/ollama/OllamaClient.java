package com.sanghee.backend.ollama;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Component
public class OllamaClient {

    private final RestClient restClient;
    private final String model;

    public OllamaClient(
        @Value("${sanghee.ollama.base-url}") String baseUrl,
        @Value("${sanghee.ollama.model}") String model
    ) {
        this.restClient = RestClient.create(baseUrl);
        this.model = model;
    }

    public String chat(List<Map<String, String>> messages) {
        // stream:false로 받는 이유: 지금 프론트는 응답 하나를 통째로 받는 구조라서.
        // 나중에 타이핑 효과(스트리밍)를 붙이면 여기랑 프론트 useChat 둘 다 SSE로 같이 바꿔야 함.
        //
        // think:false로 끄는 이유: qwen3는 답하기 전에 내부적으로 긴 추론(생각) 과정을 거치는
        // 하이브리드 모델이라 think를 켜두면 캐주얼한 잡담 한 번에 1분 넘게 걸림.
        // 상희는 가벼운 대화 상대라 깊은 추론이 필요 없어서 꺼서 응답 속도를 확보함.
        Map<String, Object> requestBody = Map.of(
            "model", model,
            "messages", messages,
            "stream", false,
            "think", false
        );

        Map<?, ?> response = restClient.post()
            .uri("/api/chat")
            .body(requestBody)
            .retrieve()
            .body(Map.class);

        if (response == null || !(response.get("message") instanceof Map<?, ?> message)) {
            throw new IllegalStateException("Ollama 응답 형식이 예상과 다름: " + response);
        }

        Object content = message.get("content");
        if (content == null) {
            throw new IllegalStateException("Ollama 응답에 content가 없음: " + message);
        }
        return content.toString();
    }
}
