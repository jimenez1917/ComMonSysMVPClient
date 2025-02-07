import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";

import Transactions from "./components/Transactions";
import ShopsMap from "./components/Shops";
import Timeline from "./components/Timeline";
import Spacer from "./components/Spacer";
import BlockchainProvider from "./providers/BlockchainProvider";
import TimelineProvider from "./providers/TimelineProvider";
import VoteStoreProvider from "./providers/VoteStoreProvider";

import { NativeBaseProvider } from "native-base";

const App = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <NativeBaseProvider>
          <BlockchainProvider>
            <VoteStoreProvider>
              <Transactions />
              <Spacer />
              <ShopsMap />
              <Spacer />
              <TimelineProvider>
                <Timeline />
              </TimelineProvider>
            </VoteStoreProvider>
          </BlockchainProvider>
        </NativeBaseProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#D8D8D8",
  },
});
