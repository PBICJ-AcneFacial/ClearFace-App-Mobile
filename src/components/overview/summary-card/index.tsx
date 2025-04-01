import { Text, View } from 'react-native'
import { styles } from './styles'
import { colors } from '@/styles/theme'

type Classification = 'moderada' | 'grave' | 'leve'

interface SummaryCardProps {
  classification: Classification
}

export function SummaryCard({ classification }: SummaryCardProps) {
  const statusColors = {
    moderada: '#F59E0B', // Laranja
    grave: colors.red.base, // Vermelho
    leve: colors.green.base, // Verde
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Resumo:</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Classificação atual:</Text>
        <Text style={[styles.status, { color: statusColors[classification] }]}>
          {classification.charAt(0).toUpperCase() + classification.slice(1)}
        </Text>
      </View>
      <Text style={styles.description}>
        A classificação atual é {classification}. Seu grau de acne pode ser
        reduzido se continuar assim.
      </Text>
    </View>
  )
}
