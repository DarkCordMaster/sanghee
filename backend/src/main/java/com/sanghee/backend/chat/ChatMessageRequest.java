package com.sanghee.backend.chat;

import jakarta.validation.constraints.NotBlank;

public record ChatMessageRequest(
    @NotBlank String sessionId,
    @NotBlank String message
) {
}
