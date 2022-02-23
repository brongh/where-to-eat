import { ScoreRating } from "../enums/scoreRating";

export const ratingColor = (score: number) => {
  let scoreRating: ScoreRating | 0 = 0;
  if (score >= 4.5) {
    scoreRating = ScoreRating.EXCELLENT;
  }
  if (score >= 4 && score < 4.5) {
    scoreRating = ScoreRating.GREAT;
  }
  if (score >= 3.5 && score < 4) {
    scoreRating = ScoreRating.OK;
  }
  if (score >= 2 && score < 3.5) {
    scoreRating = ScoreRating.BAD;
  }
  if (score < 2) {
    scoreRating = ScoreRating.TERRIBLE;
  }
  switch (scoreRating) {
    case ScoreRating.GREAT:
      return "text-green-500";
    case ScoreRating.GREAT:
      return "text-green-300";
    case ScoreRating.OK:
      return "text-yellow-500";
    case ScoreRating.BAD:
      return "text-red-700";
    case ScoreRating.TERRIBLE:
      return "text-red-400";
    default:
      return "text-green-500";
  }
};
