import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Usa 'cover' para preencher toda a tela
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  messageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.gray[900],
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '75%',
  },
  messageImage: {
    width: 200,
    height: 120,
    borderRadius: 8,
  },
  uploadContainer: {
    backgroundColor: colors.gray[900],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 16,
  },
  previewContainer: {
    padding: 2,
    borderRadius: 24,
    gap: 12,
  },
  previewImage: {
    height: 200,
    borderRadius: 12,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  buttonText: {
    color: colors.gray[50],
    marginRight: 8,
    fontSize: 20,
    fontFamily: fontFamily.regular,
    maxWidth: 280,
  },
})