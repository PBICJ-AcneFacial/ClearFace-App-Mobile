import { Text, View } from 'react-native'
import { styles } from './styles'
import { ConsultationResult } from '@/services/http/consultations/get-consultation-by-id'
import { getIgaLevel } from '@/functions'

interface ResultCardProps {
  result: ConsultationResult
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) return null

  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultTitle}>Resultado:</Text>

      <View style={styles.itemRow}>
        <Text style={styles.label}>Classificação:</Text>
        <Text style={styles.valueHighlight}>
          {getIgaLevel(result.iga_score)}
        </Text>
      </View>

      <View style={styles.itemRow}>
        <Text style={styles.label}>Comedões:</Text>
        <Text style={styles.value}>
          {result.acne_quantity['Cravos Brancos'] +
            result.acne_quantity['Cravos Pretos']}
        </Text>
      </View>

      <View style={styles.itemRow}>
        <Text style={styles.label}>Pústulas:</Text>
        <Text style={styles.value}>{result.acne_quantity['Pústulas']}</Text>
      </View>

      <View style={styles.itemRow}>
        <Text style={styles.label}>Pápulas:</Text>
        <Text style={styles.value}>{result.acne_quantity['Pápulas']}</Text>
      </View>

      <Text style={styles.precisionText}>
        Este resultado tem 75% de precisão. Recomendamos que procure um
        profissional de saúde para uma avaliação mais detalhada.
      </Text>
    </View>
  )
}
