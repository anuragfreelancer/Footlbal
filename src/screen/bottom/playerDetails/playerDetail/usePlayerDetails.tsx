import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RNFS from 'react-native-fs';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { requestStoragePermission } from '../../../../requestStoragePermission';
const usePlayerDetails = () => {
  const route: any = useRoute();
  const { item } = route.params || ""; // Provide a fallback if route.params is undefined
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const isLogin = useSelector((state: any) => state?.auth);
 
   const downloadVideo = async () => {
    const fileUrl = 'https://file-examples.com/storage/fe2465184067ef97996fb41/2017/10/file-sample_150kB.pdf';
    const fileName = 'sample.pdf';
  
    const downloadPath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;
  
    try {
      // Ask permission (Android 10 or lower)
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Storage permission is required to download files.');
          return;
        }
      }
      // Delete existing file if exists
      const fileExists = await RNFS.exists(downloadPath);
      if (fileExists) {
        await RNFS.unlink(downloadPath);
      }
  
      // Download the file
      const downloadResult = RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: downloadPath,
      });
  
      const result = await downloadResult.promise;
  
      if (result.statusCode === 200) {
        Alert.alert('Success', 'PDF downloaded successfully!');
        console.log('Saved to:', downloadPath);
  
        // Open the downloaded PDF
       
      } else {
        Alert.alert('Failed', `Download failed with status: ${result.statusCode}`);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Error', `An error occurred: ${error.message || JSON.stringify(error)}`);
    }
  };
  
  
  
  return {
    navigation,
    item,
    isLogin,
    downloadVideo,
    loading
  };
};

export default usePlayerDetails;
