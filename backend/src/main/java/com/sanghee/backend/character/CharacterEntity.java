package com.sanghee.backend.character;

import java.time.LocalDateTime;

public record CharacterEntity(
    Long id,
    String name,
    String basicInfo,
    String personality,
    String speechStyle,
    String background,
    String valuesAndLimits,
    String hiddenContext,
    String speechExamples,
    String closenessStyle,
    LocalDateTime createdAt
) {
}
