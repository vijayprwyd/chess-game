export interface MovesProps {
  history: string[];
  onMoveClick: (move: number, undoMove?: boolean) => void;
}
