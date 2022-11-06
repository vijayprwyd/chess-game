export enum GameOverReason {
  CheckMate = 'CHECK_MATE',
  StaleMate = 'STALE_MATE',
  InsufficientMaterial = 'INSUFFICIENT_MATERIAL',
  ThreeFoldRepetition = 'THREE_FOLD_REPETITION',
  DrawByAgreement = 'DRAW_BY_AGREEMENT',
  Resined = 'Resigned',
  Timeout = 'TIME_OUT',
}

export enum Player {
  White = 'white',
  Black = 'black',
}
