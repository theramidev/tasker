import ImagePicker from 'react-native-image-picker';
import fs from 'react-native-fs';

/**
 * @description Graba un video
 * @return Promise<string> --> Path del video
 */
export const takeVideo = (
  videoQuality: 'low' | 'high' = 'low',
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      ImagePicker.launchCamera(
        {
          cameraType: 'back',
          mediaType: 'video',
          videoQuality,
          durationLimit: 90,
          noData: true,
          permissionDenied: {
            title: 'Permiso denegado',
            text: 'Para poder grabar videos con su cámara.',
            reTryTitle: 'Reintentar',
            okTitle: 'Estoy seguro',
          },
        },
        async ({uri, didCancel, error}: any) => {
          if (didCancel) {
            reject('canceled');
            return;
          }

          if (error) {
            reject(error);
            return;
          }

          const existDir = await fs.exists(
            `${fs.ExternalDirectoryPath}/videos`,
          );

          if (!existDir) {
            await fs.mkdir(`${fs.ExternalDirectoryPath}/videos`);
          }
          // console.log(uri);

          const path = `${fs.ExternalDirectoryPath}/videos/${Date.now()}.mp4`;
          await fs.copyFile(uri, path);
          resolve(path);
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * @description Toma una foto con la cámara
 * @return Promise<string> -> path de la imagen
 */
export const takePictureFromCamera = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      ImagePicker.launchCamera(
        {
          cameraType: 'back',
          mediaType: 'photo',
          quality: 1,
          noData: true,
          permissionDenied: {
            title: 'Permiso denegado',
            text:
              'Para poder tomar fotos con su cámara y elegir imágenes de su biblioteca.',
            reTryTitle: 'Reintentar',
            okTitle: 'Estoy seguro',
          },
        },
        async ({didCancel, error, uri}: any) => {
          if (didCancel) {
            reject('canceled');
            if (uri) {
              await fs.unlink(uri);
            }
            return;
          }

          if (error) {
            reject(error);
            return;
          }

          if (!(await fs.exists(`${fs.ExternalDirectoryPath}/auxImage`))) {
            await fs.mkdir(`${fs.ExternalDirectoryPath}/auxImage`);
          }

          const path = `${fs.ExternalDirectoryPath}/auxImage/image${Date.now()}.jpg`;
          await fs.copyFile(uri, path);
          resolve(path);
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * @description Abre la galería de fotos
 * @return Promise<string> -> path de la foto
 */
export const takePictureFromGallery = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
          noData: true,
          permissionDenied: {
            title: 'Permiso denegado',
            text:
              'Para poder tomar fotos con su cámara y elegir imágenes de su biblioteca.',
            reTryTitle: 'Reintentar',
            okTitle: 'Estoy seguro',
          },
        },
        async ({error, didCancel, uri}: any) => {
          if (error) {
            reject(error);
            return;
          }

          if (didCancel) {
            reject('canceled');
            return;
          }

          if (!(await fs.exists(`${fs.ExternalDirectoryPath}/auxImage`))) {
            await fs.mkdir(`${fs.ExternalDirectoryPath}/auxImage`);
          }

          const path = `${fs.ExternalDirectoryPath}/auxImage/${Date.now()}.jpg`;
          await fs.copyFile(uri, path);

          resolve(path);
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};
