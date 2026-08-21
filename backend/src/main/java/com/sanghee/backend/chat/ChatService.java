package com.sanghee.backend.chat;

import com.sanghee.backend.character.CharacterService;
import com.sanghee.backend.ollama.OllamaClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    // 프롬프트에 넣을 최근 대화 개수(6턴 = 유저/상희 합쳐서 12개).
    // 너무 적으면 상희가 방금 한 말을 까먹은 것처럼 굴고, 너무 많으면 응답이 느려짐
    private static final int HISTORY_LIMIT = 12;

    private final ChatMessageMapper chatMessageMapper;
    private final CharacterService characterService;
    private final OllamaClient ollamaClient;

    public ChatService(ChatMessageMapper chatMessageMapper, CharacterService characterService, OllamaClient ollamaClient) {
        this.chatMessageMapper = chatMessageMapper;
        this.characterService = characterService;
        this.ollamaClient = ollamaClient;
    }

    public String reply(String sessionId, String userMessage) {
        chatMessageMapper.insert(sessionId, "user", userMessage);

        List<ChatMessageEntity> recent = chatMessageMapper.selectRecentBySession(sessionId, HISTORY_LIMIT);
        Collections.reverse(recent); // DESC로 가져온 걸 다시 시간순으로 뒤집음

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", characterService.getSystemPrompt()));
        for (ChatMessageEntity m : recent) {
            messages.add(Map.of("role", m.role(), "content", m.content()));
        }

        String reply = ollamaClient.chat(messages);

        chatMessageMapper.insert(sessionId, "assistant", reply);
        return reply;
    }
}
