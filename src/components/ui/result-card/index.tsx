import { Text, View } from "react-native";
import { styles } from "./styles";
import { AcneAnalysisResult, useConsultation } from "@/contexts/consultation-context";

interface ResultCardProps {
  result: AcneAnalysisResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) return null;

  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultTitle}>Resultado:</Text>
      <Text style={styles.resultItem}>
        Classificação:{' '}
        <Text style={{ color: 'orange', fontWeight: 'bold' }}>Moderada</Text>
      </Text>
      <Text style={styles.resultItem}>
        Comedões: {result.resultado.acne_quantity["Cravos Brancos"] + result.resultado.acne_quantity["Cravos Pretos"]}
      </Text>
      <Text style={styles.resultItem}>
        Pústulas: {result.resultado.acne_quantity["Pústulas"]}
      </Text>
      <Text style={styles.resultItem}>
        Pápulas: {result.resultado.acne_quantity["Pápulas"]}
      </Text>
      <Text style={styles.precisionText}>
        Este resultado tem 75% de precisão. Recomendamos que procure um profissional de saúde para uma avaliação mais detalhada.
      </Text>
    </View>
  );
};

