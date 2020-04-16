
export type createThingsToDoModel = {
    title: string,
    tag?: string | null,
    color?: string | null,
    isFavorite?: 0 | 1,
    isFixed?: 0 | 1,
    dateReminder?: Date | null,
}