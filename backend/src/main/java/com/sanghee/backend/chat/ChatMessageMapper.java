package com.sanghee.backend.chat;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ChatMessageMapper {

    @Insert("""
        INSERT INTO chat_message (session_id, role, content)
        VALUES (#{sessionId}, #{role}, #{content})
        """)
    void insert(@Param("sessionId") String sessionId, @Param("role") String role, @Param("content") String content);

    // 세션의 대화를 전부 가져오지 않고 최근 N개만 가져옴 — 매번 전체 기록을 프롬프트에
    // 넣으면 대화가 길어질수록 요청이 느려지고 컨텍스트 길이 제한에도 걸리기 때문
    @Select("""
        SELECT id, session_id AS sessionId, role, content, created_at AS createdAt
        FROM chat_message
        WHERE session_id = #{sessionId}
        ORDER BY id DESC
        LIMIT #{limit}
        """)
    List<ChatMessageEntity> selectRecentBySession(@Param("sessionId") String sessionId, @Param("limit") int limit);
}
