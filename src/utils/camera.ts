import ImagePicker from 'react-native-image-picker';
import fs from 'react-native-fs';

/**
 * @description Toma una foto con la cámara
 * @return Promise<string> -> path de la imagen
 */
export const takePictureFromCamera = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            ImagePicker.launchCamera({
                cameraType: 'back',
                mediaType: 'photo',
                quality: 1,
                noData: true,
                permissionDenied: {
                    title: 'Permiso denegado',
                    text: 'Para poder tomar fotos con su cámara y elegir imágenes de su biblioteca.',
                    reTryTitle: 'Reintentar',
                    okTitle: 'Estoy seguro'
                }
            }, async ({didCancel, error, uri}) => {
                if (didCancel) {
                    reject('canceled');
                    return;
                }

                if (error) {
                    reject(error);
                    return;
                }

                const existDir = await fs.exists(`${fs.ExternalDirectoryPath}/images`);

                if (!existDir) {
                    await fs.mkdir(`${fs.ExternalDirectoryPath}/images`);
                }

                const path = `${fs.ExternalDirectoryPath}/images/${Date.now()}.jpg`;
                await fs.copyFile(uri, 'file://'+path);
                resolve(path);
            });
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * @description Abre la galería de fotos
 * @return Promise<string> -> path de la foto
 */
export const takePictureFromGallery = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                noData: true,
                permissionDenied: {
                    title: 'Permiso denegado',
                    text: 'Para poder tomar fotos con su cámara y elegir imágenes de su biblioteca.',
                    reTryTitle: 'Reintentar',
                    okTitle: 'Estoy seguro'
                }
            }, async ({error, didCancel, uri}) => {
        
                if (error) {
                    reject(error);
                    return;
                }

                if (didCancel) {
                    reject('canceled');
                    return;
                }

                const existDir = await fs.exists(`${fs.ExternalDirectoryPath}/images`);

                if (!existDir) {
                    await fs.mkdir(`${fs.ExternalDirectoryPath}/images`);
                }

                const path = `${fs.ExternalDirectoryPath}/images/${Date.now()}.jpg`;
                await fs.copyFile(uri, path);

                resolve(path);
            });
        } catch (error) {
            reject(error);
        }
    });
}