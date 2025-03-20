import { router } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export function NewConsultationButton() {
  function redirectToNewConsullationScreen() {
    router.navigate('../1')
  }

  return (
    <TouchableOpacity onPress={redirectToNewConsullationScreen} style={styles.button}>
      <Text style={styles.buttonText}>Nova</Text>
      <Plus color='#fff' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#111827', // bg-gray-900
    paddingHorizontal: 12, // px-3
    paddingVertical: 8, // py-2
    borderRadius: 12, // rounded-xl
    gap: 12, // gap-3
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA', // text-zinc-50
    fontWeight: '600', // font-semibold
  },
})
