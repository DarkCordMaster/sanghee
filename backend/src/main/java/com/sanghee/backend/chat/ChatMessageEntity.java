package com.sanghee.backend.chat;

import java.time.LocalDateTime;

public record ChatMessageEntity(
    Long id,
    String sessionId,
    String role,
    String content,
    LocalDateTime createdAt
) {
}
