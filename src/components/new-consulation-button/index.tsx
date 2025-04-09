import { Plus } from 'lucide-react-native'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { useConsultation } from '@/contexts/consultation-context'

export function NewConsultationButton() {
  const { handleCreateConsultation } = useConsultation()

  return (
    <TouchableOpacity onPress={handleCreateConsultation} style={styles.button}>
      <Text style={styles.buttonText}>Nova</Text>
      <Plus color='#fff' />
    </TouchableOpacity>
  )
}
