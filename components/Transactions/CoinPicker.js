import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TransactionsContext } from "../../providers/TransactionsProvider";

const CoinPicker = () => {
  const { mode, balances } = useContext(TransactionsContext);

  const composeBalance = (balance) => {
    if (mode == "displayingQR") {
      return "❓";
    }
    if (mode == "loading" || mode == "unset") {
      return "✋⏳";
    }
    return balance;
  };

  return (
    <Picker style={styles.picker} itemStyle={styles.pickerItem}>
      <Picker.Item
        label={`₱oblado | $` + composeBalance(balances.posted?.pc)}
        value="poblado"
      />
      <Picker.Item
        label={`ComMonSys | $` + composeBalance(balances.posted?.coms)}
        value="commonsys"
      />
    </Picker>
  );
};

export default CoinPicker;

const styles = StyleSheet.create({
  picker: {
    width: 250,
  },
  pickerItem: {
    color: "black",
  },
});
