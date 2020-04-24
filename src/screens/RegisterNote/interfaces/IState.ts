import {MTag} from 'src/models/tag.model';

export interface IState {
  headerColor: string | null;
  openModalColors: boolean;
  openModalDate: boolean;
  openActionSheet: boolean;
  openModalTags: boolean;
  openAudioPlayer: boolean;

  title: string;
  message: string;
  favorite: boolean;
  fixed: boolean;
  tag: MTag | null;
  dateNote: string | Date | null;
  audioNote: string | null;
  imageNote: string | null;
  videoNote: string | null | any;
}
