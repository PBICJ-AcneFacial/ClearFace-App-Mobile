import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[200],
  
  },
  content: {
    alignItems: 'flex-start',
    padding: 20,
    gap: 32
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: fontFamily.semiBold
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
  }
})