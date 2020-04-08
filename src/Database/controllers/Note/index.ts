import { 
    createNote,
    setNoteComplement
} from './store';

export type noteComplement = {type: 'Audio' | 'Video' | 'Image', path: string};
export type noteCreateParam = {
    title: string,
    message: string,
    tag?: string | null,
    dateReminder?: Date | null,
    color?: string | null,
    isFavorite?: 0 | 1,
    isFixed?: 0 | 1,
    complements?: noteComplement[] | null
}

class NoteController {

    /**
     * @description Crea una nota en la base de datos
     * @param title Titulo de la nota
     * @param message Mensaje de la nota
     * @param tag tag de la nota
     * @param color color de la nota HEX: #FFFFFF. Default null
     * @param isFavorite Si es una nota favorita. Default 0
     * @param isFixed Si es una nota fijada. Default 0
     * @param dateReminder Fecha del recordatorio. Default null
     * @param complements Complementos audiovisuales de la nota
     * @return Promise<number> <- ID de la nota
     */
    public static createNote({
        title,
        message,
        tag = null,
        dateReminder = null,
        color = null,
        isFavorite = 0,
        isFixed = 0,
        complements = null
    }: noteCreateParam): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await createNote({title, message, tag, dateReminder, color, isFavorite, isFixed});
                
                if (complements) {
                    for (const complement of complements) {
                        await setNoteComplement(complement, result.insertId);
                    }
                }

                resolve(result.rowsAffected ? result.insertId : 0)
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default NoteController;