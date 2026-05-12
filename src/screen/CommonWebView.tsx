import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../compoent/CustomHeader';
import imageIndex from '../assets/imageIndex';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import StatusBarComponent from '../compoent/StatusBarCompoent';
import localizationStrings from '../compoent/Localization/Localization';

const CommonWebView = ({ route, navigation }: any) => {
  const { url, title } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBarComponent />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.headerWrapper}>
          <CustomHeader
            label={title || localizationStrings.PrivacyPolicy}
            imageSource={imageIndex.backNav}
          />
        </View>

        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: url }}
            style={styles.webview}
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#A0D803" />
              </View>
            )}
            javaScriptEnabled
            domStorageEnabled
            scalesPageToFit
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: wp(2),
    paddingBottom: hp(1),
    backgroundColor: '#FFFFFF',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Soft background for the container
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
});

export default CommonWebView;
