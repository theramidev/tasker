import {MTag} from 'src/models/tag.model';

export interface IState {
  headerColor: string | undefined;
  openModalColors: boolean;
  openModalDate: boolean;
  openActionSheet: boolean;
  openModalTags: boolean;
  openAudioPlayer: boolean;

  favorite: boolean;
  fixed: boolean;
  tag: MTag | null;
  dateNote: string | Date | null;
  audioNote: string | null;
  imageNote: string | null;
  videoNote: string | null | any;
}
