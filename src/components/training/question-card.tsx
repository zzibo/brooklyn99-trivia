"use client";

import { SpeechBubble } from "@/components/pixel/speech-bubble";
import { CharacterSprite } from "@/components/pixel/character-sprite";
import { AnswerOption } from "@/components/pixel/answer-option";
import type { Question, Character, Expression } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  character: Character | null;
  expression: Expression;
  selectedAnswerId: number | null;
  isRevealed: boolean;
  onSelectAnswer: (answerId: number) => void;
}

export function QuestionCard({
  question,
  character,
  expression,
  selectedAnswerId,
  isRevealed,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Character + Speech Bubble */}
      <div className="flex items-end gap-4">
        <CharacterSprite
          characterId={question.characterId}
          expression={expression}
          size="lg"
          className="shrink-0"
        />
        <SpeechBubble characterName={character?.name} className="flex-1">
          {question.question}
        </SpeechBubble>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <AnswerOption
            key={answer.id}
            text={answer.text}
            index={index}
            isSelected={selectedAnswerId === answer.id}
            isCorrect={isRevealed ? answer.isCorrect : undefined}
            isRevealed={isRevealed}
            onClick={() => onSelectAnswer(answer.id)}
            disabled={isRevealed}
          />
        ))}
      </div>
    </div>
  );
}
