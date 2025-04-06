import { Text, View } from 'react-native'
import { styles } from './styles'
import { AcneAnalysisResult } from '@/contexts/consultation-context'
import { getIgaLevel } from '@/functions'

interface ResultCardProps {
  result: AcneAnalysisResult
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) return null

  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultTitle}>Resultado:</Text>

      <View style={styles.itemRow}>
        <Text style={styles.label}>Classificação:</Text>
        <Text style={styles.valueHighlight}>
          {getIgaLevel(result.resultado.iga_score)}
        </Text>
      </View>

      <View style={styles.itemRow}>
        <Text style={styles.label}>Comedões:</Text>
        <Text style={styles.value}>
          {result.resultado.acne_quantity['Cravos Brancos'] +
            result.resultado.acne_quantity['Cravos Pretos']}
        </Text>
      </View>

      <View style={styles.itemRow}>
        <Text style={styles.label}>Pústulas:</Text>
        <Text style={styles.value}>
          {result.resultado.acne_quantity['Pústulas']}
        </Text>
      </View>

      <View style={styles.itemRow}>
        <Text style={styles.label}>Pápulas:</Text>
        <Text style={styles.value}>
          {result.resultado.acne_quantity['Pápulas']}
        </Text>
      </View>

      <Text style={styles.precisionText}>
        Este resultado tem 75% de precisão. Recomendamos que procure um
        profissional de saúde para uma avaliação mais detalhada.
      </Text>
    </View>
  )
}
