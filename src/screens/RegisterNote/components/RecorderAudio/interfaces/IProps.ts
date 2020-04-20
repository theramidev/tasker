export interface IProps {
  show: boolean;
  clearNote: () => void;
  saveNote: (path: string) => void;
}
