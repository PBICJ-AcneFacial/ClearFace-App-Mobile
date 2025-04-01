import { fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24
  },
  header: {
    width: '100%',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: fontFamily.semiBold
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#52525B',
    fontFamily: fontFamily.semiBold,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 16,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: '#52525B',
  },
  registerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#52525B',
    textAlign: 'center',
  },
  registerLink: {
    textDecorationLine: 'underline',
  },
})