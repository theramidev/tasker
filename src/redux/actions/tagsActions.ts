import {Dispatch} from 'redux';

import TagController from '../../Database/controllers/Tag';
import tagsTypes from '../types/tagsTypes';
import {MTag} from 'src/models/tag.model';

/**
 * @description obtiene todos los tags de la base de datos
 */
export const getTags = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: tagsTypes.loadingGetTags,
    });

    const tags = await TagController.getAllTags();

    dispatch({
      type: tagsTypes.updateTags,
      payload: tags,
    });
  } catch (error) {
    dispatch({
      type: tagsTypes.errorGetTags,
      payload: error,
    });

    dispatch({
      type: tagsTypes.errorGetTags,
      payload: null,
    });
  }
};

/**
 * @description registra un tag en la base de datos
 * @param tagName
 * @param color
 */
export const registerTag = (tagName: string, color: string) => async (
  dispatch: Dispatch,
  getState: any,
) => {
  try {
    dispatch({
      type: tagsTypes.loadingRegisterTag,
    });

    const tagId = await TagController.createTag(tagName, color);
    const {tags} = getState().tagsReducer;
    const newTag = {tagId, name: tagName, color};

    dispatch({
      type: tagsTypes.updateTags,
      payload: [newTag, ...tags],
    });
  } catch (error) {
    dispatch({
      type: tagsTypes.errorRegisterTag,
      payload: error,
    });

    dispatch({
      type: tagsTypes.errorRegisterTag,
      payload: null,
    });
  }
};

/**
 * @description modifica un tag
 * @param tag
 * @param index
 */
export const updateTag = (tag: MTag, index: number) => async (
  dispatch: Dispatch,
  getState: any,
) => {
  try {
    const tagId = await TagController.updateTag(tag);
    const {tags} = getState().tagsReducer;

    tags[index] = {...tags[index], color: tag.color};

    dispatch({
      type: tagsTypes.updateTags,
      payload: tags,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description elimina un tag
 * @param idTag
 * @param index
 */
export const deleteTag = (idTag: number, index: number) => async (
  dispatch: Dispatch,
  getState: any,
) => {
  try {
    const isDelete = await TagController.deleteTag(idTag);
    const {tags} = getState().tagsReducer;

    tags.splice(index, 1);

    dispatch({
      type: tagsTypes.updateTags,
      payload: tags,
    });
  } catch (error) {
    console.log(error);
  }
};
