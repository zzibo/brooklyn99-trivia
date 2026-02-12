import { fsrs, createEmptyCard, type Card, Rating, type RecordLogItem } from "ts-fsrs";
import type { FSRSCardState } from "./types";

const f = fsrs();

export function createNewCard(questionId: number): FSRSCardState {
  const card = createEmptyCard();
  return cardToState(questionId, card);
}

export function reviewCard(
  state: FSRSCardState,
  rating: Rating
): { nextState: FSRSCardState; nextReviewDate: Date } {
  const card = stateToCard(state);
  const now = new Date();
  const scheduling = f.repeat(card, now);
  const result: RecordLogItem = scheduling[rating];
  const nextCard = result.card;

  return {
    nextState: cardToState(state.questionId, nextCard),
    nextReviewDate: nextCard.due,
  };
}

export function isDue(state: FSRSCardState): boolean {
  return new Date(state.due) <= new Date();
}

export function cardToState(questionId: number, card: Card): FSRSCardState {
  return {
    questionId,
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    last_review: card.last_review ? new Date(card.last_review).toISOString() : undefined,
  };
}

function stateToCard(state: FSRSCardState): Card {
  return {
    due: new Date(state.due),
    stability: state.stability,
    difficulty: state.difficulty,
    elapsed_days: state.elapsed_days,
    scheduled_days: state.scheduled_days,
    reps: state.reps,
    lapses: state.lapses,
    state: state.state,
    last_review: state.last_review ? new Date(state.last_review) : undefined,
  } as Card;
}

export { Rating };
