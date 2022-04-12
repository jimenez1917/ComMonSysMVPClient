import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Camera } from "expo-camera";
import { TransactionsContext } from "../../providers/TransactionsProvider";
import QRCode from "react-native-qrcode-svg";

const QRInterface = () => {
  const [hasPermission, setHasPermission] = useState(null);

  const {
    mode,
    setMode,
    transformQRDataToCommonsysData,
    userQRValue,
    setSendFormData,
  } = useContext(TransactionsContext);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data: qrData }) => {
    setSendFormData(transformQRDataToCommonsysData(qrData));
    setMode("inputtingSendForm");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.qrLike}>
      {mode == "inputtingQR" ? (
        <Camera
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.full}
          autoFocus={"on"}
        >
          <Pressable
            style={styles.full}
            onPress={() => {
              setMode("displayingQR");
            }}
          />
        </Camera>
      ) : (
        <Pressable
          style={styles.full}
          onPress={() => {
            setMode("inputtingQR");
          }}
        >
          <QRCode value={userQRValue} size={200} />
        </Pressable>
      )}
    </View>
  );
};

export default QRInterface;

const styles = StyleSheet.create({
  qrLike: {
    width: 200,
    height: 200,
  },
  full: {
    width: "100%",
    height: "100%",
  },
});
