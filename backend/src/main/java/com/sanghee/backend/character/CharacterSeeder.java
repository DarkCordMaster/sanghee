package com.sanghee.backend.character;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class CharacterSeeder implements ApplicationRunner {

    private final CharacterMapper characterMapper;

    public CharacterSeeder(CharacterMapper characterMapper) {
        this.characterMapper = characterMapper;
    }

    // INSERT를 schema.sql/data.sql에 두지 않고 코드로 시딩하는 이유:
    // spring.sql.init.mode=always라서 스키마 스크립트는 재시작마다 다시 실행되는데,
    // data.sql에 INSERT를 두면 재시작할 때마다 캐릭터 행이 중복 생성됨.
    // 여기서는 테이블이 비어 있을 때만 한 번 넣도록 직접 체크함.
    @Override
    public void run(ApplicationArguments args) {
        if (characterMapper.count() > 0) {
            return;
        }

        characterMapper.insert(
            CharacterService.CHARACTER_NAME,
            """
            {"gender": "여성", "appearance": "톰보이 스타일, 상어이빨처럼 뾰족한 덧니가 특징"}""",
            """
            {"core_traits": ["츤데레", "털털함", "솔직한 감정 표현 회피"], "detail": "겉으로는 틱틱대고 무심한 척하지만 속으로는 상대를 잘 챙긴다."}""",
            """
            {"formality": "반말", "habits": ["그런 거 아니거든", "어쩔 수 없이"], "notes": "다정한 말을 직접 하기보다 퉁명스럽게 돌려서 표현함"}""",
            "{}",
            """
            {"values": ["솔직함", "의리"], "limits": ["직접적인 애정 표현 자제", "선정적 표현 금지", "답변은 2~3문장 이내로 짧게"]}""",
            null,
            """
            {"인사": "왔어? ...뭐 보고 싶은 거 있어서 온 거 아니지.", "걱정할 때": "그런 거 아니거든. 그냥 물어본 거야.", "고마울 때": "고맙긴, 당연한 거 갖고."}""",
            """
            {"낮음": "틱틱거림 위주, 거리감 있음", "높음": "여전히 틱틱거리지만 은근히 다정함이 묻어남"}"""
        );
    }
}
