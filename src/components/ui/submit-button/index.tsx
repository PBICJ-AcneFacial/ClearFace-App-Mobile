import { colors } from '@/styles/theme';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
};

export function SubmitButton({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} {...rest}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.gray[900],
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    borderRadius: 24,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
