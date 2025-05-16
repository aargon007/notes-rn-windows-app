import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { WebView } from 'react-native-webview';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigators/RootNavigator';
import { useWindowDimensions } from 'react-native-windows';
import { useTheme } from '@/context/ThemeContext';
import BookmarkIcon from '@/icons/BookmarkIcon';
import BackIcon from '@/icons/BackIcon';
import { viewNote } from '@/utils/viewNote';
import DeleteIcon from '@/icons/DeleteIcon';
import { deleteNote } from '@/db/notes.service';
import { useDatabase } from '@/context/DatabaseContext';

const SingleNote = ({ route, navigation }: { route: RouteProp<RootStackParamList, "SingleNote">; navigation: any }) => {
  const { content, title, id } = route.params;
  const { width, height } = useWindowDimensions();
  const { db } = useDatabase();
  const { colors } = useTheme();

  const handleMessage = (event: any) => {
  };

  const handleDelete = () => {
    deleteNote(db!, id);
    navigation.goBack();
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
            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 15 }}>
              <TouchableOpacity activeOpacity={0.5}>
                <BookmarkIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} activeOpacity={0.5}>
                <DeleteIcon />
              </TouchableOpacity>
            </View>
          </View>

          <WebView
            originWhitelist={['*']}
            source={{ html: viewNote(content) }}
            style={{ height: height - 140, }}
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
    width: "90%",
    maxWidth: 800,
    padding: 20,
    marginHorizontal: "auto"
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
