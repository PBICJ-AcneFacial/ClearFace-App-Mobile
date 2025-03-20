import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

export default function OverviewScreen() {
  const DATA = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: Math.random() * 100, // Simulação de dados aleatórios
  }))

  const chartHeight = 300
  const width = Dimensions.get('window').width - 40

  return (
    <View style={{ backgroundColor: '#F5F8FF', padding: 10 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        Evolução da Condição
      </Text>

      <View style={{ flex: 1 }}>
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
            backgroundColor: '#F5F8FF',
            backgroundGradientFrom: '#F5F8FF',
            backgroundGradientTo: '#F5F8FF',
            decimalPlaces: 0,
            color: () => '#1E5AFF',
            labelColor: () => '#AAB2C8',
            propsForDots: {
              r: '2',
              strokeWidth: '1',
              stroke: '#1E5AFF',
            },
            propsForBackgroundLines: {
              stroke: '#E5E8F0',
              strokeDasharray: '5 5',
            },
          }}
          bezier
          style={{ borderRadius: 10 }}
        />
      </View>
    </View>
  )
}
