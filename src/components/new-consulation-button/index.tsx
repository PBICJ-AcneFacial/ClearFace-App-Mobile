import { router } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'

export function NewConsultationButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Nova</Text>
      <Plus color='#fff' />
    </TouchableOpacity>
  )
}
