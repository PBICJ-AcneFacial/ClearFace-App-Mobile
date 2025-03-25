import { SummaryCard } from '@/components/overview/summary-card'
import React from 'react'
import { Text, View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

export default function OverviewScreen() {
  const DATA = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: Math.random() * 100, // Simulação de dados aleatórios
  }))

  const chartHeight = 300
  const width = Dimensions.get('window').width - 40

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Evolução da Condição</Text>

   

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: DATA.filter((_, i) => i % 3 === 0).map((d) => `${d.day} out`),
            datasets: [{ data: DATA.map((d) => d.value) }],
          }}
          width={width}
          height={chartHeight}
          yLabelsOffset={15}
          chartConfig={{
            backgroundColor: '#F5F8FF',
            backgroundGradientFrom: '#F5F8FF',
            backgroundGradientTo: '#F5F8FF',
            decimalPlaces: 0,
            color: () => '#1E5AFF',
            labelColor: () => '#AAB2C8',
            propsForDots: { r: '2', strokeWidth: '1', stroke: '#1E5AFF' },
            propsForBackgroundLines: { stroke: '#E5E8F0', strokeDasharray: '5 5' },
          }}
          bezier
          style={styles.chart}
        />
      </View>
      <SummaryCard classification='moderada' />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  content: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 10,
  },
})
