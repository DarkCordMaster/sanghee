package com.sanghee.backend.character;

import org.springframework.stereotype.Service;

@Service
public class CharacterService {

    // application.properties(등 .properties 파일)에 한글 값을 두면 java.util.Properties
    // 로더가 ISO-8859-1로 읽어서 깨지는 문제가 있어서, 어차피 캐릭터가 하나뿐인 지금은
    // 설정 파일 대신 여기 상수로 둠. CharacterSeeder가 시딩하는 이름과 반드시 같아야 함.
    static final String CHARACTER_NAME = "상희";

    private final CharacterMapper characterMapper;

    public CharacterService(CharacterMapper characterMapper) {
        this.characterMapper = characterMapper;
    }

    public String getSystemPrompt() {
        CharacterEntity character = characterMapper.selectByName(CHARACTER_NAME);
        if (character == null) {
            throw new IllegalStateException(
                "캐릭터를 찾을 수 없음: " + CHARACTER_NAME + " (CharacterSeeder가 아직 안 돌았을 수 있음)"
            );
        }

        // 구조화된 필드(JSON 텍스트)를 라벨 붙여서 하나의 시스템 프롬프트로 이어붙임.
        // LLM은 프롬프트 안에 JSON이 섞여 있어도 잘 이해하기 때문에 별도 파서 없이 그대로 넘김.
        StringBuilder prompt = new StringBuilder();
        prompt.append("너는 '").append(character.name()).append("'라는 이름의 캐릭터야. 아래 설정을 참고해서 그 사람처럼 대답해.\n\n");
        appendSection(prompt, "기본 정보", character.basicInfo());
        appendSection(prompt, "성격", character.personality());
        appendSection(prompt, "말투", character.speechStyle());
        appendSection(prompt, "배경", character.background());
        appendSection(prompt, "가치관과 금지사항", character.valuesAndLimits());
        appendSection(prompt, "숨겨진 설정 (대놓고 티내지 말 것)", character.hiddenContext());
        appendSection(prompt, "말투 예시", character.speechExamples());
        appendSection(prompt, "친밀도에 따른 표현 차이", character.closenessStyle());
        prompt.append("이모지는 쓰지 마.");

        return prompt.toString();
    }

    private void appendSection(StringBuilder sb, String label, String content) {
        if (content == null || content.isBlank() || content.strip().equals("{}")) {
            return;
        }
        sb.append("[").append(label).append("]\n").append(content.strip()).append("\n\n");
    }
}
