package com.sanghee.backend.character;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CharacterService {

    private final CharacterProfile profile;

    public CharacterService(
        ResourceLoader resourceLoader,
        @Value("${sanghee.character.path}") String characterPath
    ) {
        // Spring이 자동 구성해주는 ObjectMapper 빈에 기대지 않고 직접 만듦 —
        // 캐릭터 JSON 하나 읽는 용도로 앱 전역 Jackson 설정에 얽매일 필요가 없음
        ObjectMapper objectMapper = new ObjectMapper();
        Resource resource = resourceLoader.getResource(characterPath);
        try (var in = resource.getInputStream()) {
            this.profile = objectMapper.readValue(in, CharacterProfile.class);
        } catch (IOException e) {
            throw new IllegalStateException("캐릭터 정의 파일을 읽지 못했음: " + characterPath, e);
        }
    }

    public String getSystemPrompt() {
        return profile.systemPrompt();
    }
}
