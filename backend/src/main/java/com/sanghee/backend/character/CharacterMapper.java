package com.sanghee.backend.character;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface CharacterMapper {

    @Select("SELECT COUNT(*) FROM characters")
    int count();

    @Select("""
        SELECT id, name, basic_info AS basicInfo, personality, speech_style AS speechStyle,
               background, values_and_limits AS valuesAndLimits, hidden_context AS hiddenContext,
               speech_examples AS speechExamples, closeness_style AS closenessStyle, created_at AS createdAt
        FROM characters
        WHERE name = #{name}
        LIMIT 1
        """)
    CharacterEntity selectByName(@Param("name") String name);

    @Insert("""
        INSERT INTO characters
            (name, basic_info, personality, speech_style, background, values_and_limits, hidden_context, speech_examples, closeness_style)
        VALUES
            (#{name}, #{basicInfo}, #{personality}, #{speechStyle}, #{background}, #{valuesAndLimits}, #{hiddenContext}, #{speechExamples}, #{closenessStyle})
        """)
    void insert(
        @Param("name") String name,
        @Param("basicInfo") String basicInfo,
        @Param("personality") String personality,
        @Param("speechStyle") String speechStyle,
        @Param("background") String background,
        @Param("valuesAndLimits") String valuesAndLimits,
        @Param("hiddenContext") String hiddenContext,
        @Param("speechExamples") String speechExamples,
        @Param("closenessStyle") String closenessStyle
    );
}
