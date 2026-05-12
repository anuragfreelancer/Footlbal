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
    <SafeAreaView style={styles.container}  >
      <StatusBarComponent />
      <View style={{ marginTop: hp(5), marginBottom: 5 }}>
        <CustomHeader
          label={title || localizationStrings.PrivacyPolicy}
          imageSource={imageIndex.backNav}
        />
      </View>
      <View style={styles.flex}>
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="rgba(160, 216, 3, 1)" />
            </View>
          )}
          javaScriptEnabled
          domStorageEnabled
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default CommonWebView;
