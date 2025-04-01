import React from 'react'
import { Text, View, Dimensions, ScrollView } from 'react-native'
import { SummaryCard } from '@/components/overview/summary-card'
import { LineChart } from 'react-native-chart-kit'
import { styles } from './styles'
import { colors } from '@/styles/theme'

export default function OverviewScreen() {
  const DATA = [
    { day: 1, value: 80 },
    { day: 4, value: 95 },
    { day: 7, value: 60 },
    { day: 10, value: 75 },
    { day: 13, value: 50 },
    { day: 16, value: 55 },
    { day: 19, value: 40 },
    { day: 22, value: 65 },
    { day: 25, value: 45 },
    { day: 28, value: 50 },
  ]

  const chartHeight = 300
  const width = Dimensions.get('window').width - 40

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Resumo das últimas consultas</Text>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: DATA.filter((_, i) => i % 3 === 0).map(
              (d) => `${d.day} out`
            ),
            datasets: [{ data: DATA.map((d) => d.value) }],
          }}
          width={width}
          height={chartHeight}
          yLabelsOffset={15}
          chartConfig={{
            backgroundGradientFrom: colors.gray[50],
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: colors.gray[50],
            backgroundGradientToOpacity: 0,
            color: () => colors.blue.base,
            labelColor: () => colors.zinc[600],
            propsForDots: {
              r: '2',
              strokeWidth: '1',
              stroke: colors.blue.base,
            },
            propsForBackgroundLines: {
              stroke: colors.gray[300],
              strokeDasharray: '4 1',
            },
          }}
          // bezier
          style={{
            borderRadius: 12,
            backgroundColor: colors.gray[200],
            paddingTop: 20,
          }}
        />
      </View>
      <SummaryCard classification='moderada' />
    </ScrollView>
  )
}
