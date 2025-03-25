import { StyleSheet, Text, View } from 'react-native';

type Classification = 'moderada' | 'grave' | 'leve';

interface SummaryCardProps {
  classification: Classification;
}

export function SummaryCard({ classification }: SummaryCardProps) {
  const statusColors = {
    moderada: '#F59E0B', // Laranja
    grave: '#DC2626', // Vermelho
    leve: '#22C55E', // Verde
  };

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
        A classificação atual é {classification}. Seu grau de acne pode ser reduzido se continuar assim.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0F1623',
    padding: 16,
    borderRadius: 16,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  description: {
    fontSize: 14,
    color: '#E5E7EB',
  },
});
