
export type noteCreateParam = {
  title: string;
  message: string;
  tagId?: number | string | null;
  dateReminder?: Date | null;
  color?: string | null;
  isFavorite?: 0 | 1;
  isFixed?: 0 | 1;
  video?: string | null,
  image?: string | null,
  audio?: string | null
};