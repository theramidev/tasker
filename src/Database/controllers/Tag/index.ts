import { 
    createTag,
    getAllTags,
    getTagById,
    deleteTag,
    deleteTagFromList,
    deleteTagFromNote,
    updateTag
} from './store';
import { MTag, ITag } from '../../../models/tag.model';

class TagController {

    /**
     * @description Elimina un tag de la aplicación
     * @param tagId ID del tag que se va a eliminar
     * @return Promise<boolean>
     */
    public static deleteTag(tagId: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await deleteTagFromList(tagId);
                await deleteTagFromNote(tagId);
                const { rowsAffected } = await deleteTag(tagId);
                if (rowsAffected) {
                    resolve(true);
                    return;
                }
                resolve(false);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description Actualiza un Tag de la base de datos
     * @param tag Tag ACTUALIZADO
     * @return Promise<MTag> --> Tag actualizado
     */
    public static updateTag(tag: MTag): Promise<MTag> {
        return new Promise(async (resolve, reject) => {
            try {
                await updateTag(tag);
                const tagResult: ITag = (await getTagById(tag.tagId)).rows.item(0);
                resolve(new MTag(tagResult));
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description Obtiene Todos los tags de la aplicación
     * @return Promise<MTag[]>
     */
    public static getAllTags(): Promise<MTag[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const tags: MTag[] = (await getAllTags()).rows.raw().map((tag: ITag) => new MTag(tag));
                resolve(tags);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description Crea un tag
     * @param name Nombre del tag
     * @param color 
     * @return Promise<number> --> ID del tag creado
     */
    public static createTag(name: string, color: string = '#282828'): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const { insertId } = await createTag(name, color);

                resolve(insertId);
            } catch (error) {
                reject(error)
            }
        });
    }
}

export default TagController;