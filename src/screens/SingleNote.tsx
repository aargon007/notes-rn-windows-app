import React from 'react';
import { SafeAreaView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const SingleNote = ({ route }: { route: any }) => {
    const { content } = route.params;
    const { width } = useWindowDimensions();

    const htmlWrapper = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
        <style>
          body { font-family: sans-serif; padding: 16px; background: #fff; color: #111; }
          .ql-editor { font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="ql-editor">
          ${content}
        </div>
      </body>
    </html>
  `;

    return (
        <SafeAreaView style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlWrapper }}
                style={{ width: width, flex: 1 }}
                javaScriptEnabled
                domStorageEnabled
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default SingleNote;
