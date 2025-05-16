import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { WebView } from 'react-native-webview';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigators/RootNavigator';
import { useTheme } from '@/context/ThemeContext';
import BackIcon from '@/icons/BackIcon';
import BookmarkIcon from '@/icons/BookmarkIcon';
import { useWindowDimensions } from 'react-native-windows';

const SingleNote = ({ route, navigation }: { route: RouteProp<RootStackParamList, "SingleNote">; navigation: any }) => {
  const { content, title } = route.params;
  const { colors } = useTheme();
  const {width, height} = useWindowDimensions();

  const htmlWrapper = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
      <style>
        body {
          font-family: sans-serif;
          padding: 0;
          margin: 0;
          background: #fff;
          color: #111;
        }
        .ql-container {
          box-sizing: border-box;
          font-size: 18px;
          height: auto;
          min-height: 100%;
        }
        .ql-editor {
          padding: 16px;
        }
      </style>
    </head>
    <body>
      <div class="ql-container ql-snow">
        <div class="ql-editor">
          ${content}
        </div>
      </div>

      <script>
        setTimeout(() => {
          const height = document.body.scrollHeight;
          window.ReactNativeWebView.postMessage(height.toString());
        }, 100);
      </script>
    </body>
  </html>
`;


  const handleMessage = (event: any) => {
    // const height = Number(event.nativeEvent.data);
    // if (!isNaN(height)) {
    //   setWebViewHeight(height);
    // }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}>Home</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.noteContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 12, color: colors.text }}>
              {title}
            </Text>
            <TouchableOpacity activeOpacity={0.5}>
              <BookmarkIcon />
            </TouchableOpacity>
          </View>

          <WebView
            originWhitelist={['*']}
            source={{ html: htmlWrapper }}
            style={{ height: height - 140 }}
            onMessage={handleMessage}
            javaScriptEnabled
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  noteContainer: {
    flex: 1,
    padding: 20,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default SingleNote;
