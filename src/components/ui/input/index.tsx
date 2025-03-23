import { TextInput, TextInputProps, StyleSheet } from 'react-native';

type InputProps = TextInputProps & {};

export function Input({ ...rest }: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#52525C"
      {...rest}
    />
  );
}

export function MinimalistInput({ ...rest }: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#52525C"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#000',
  },
});
