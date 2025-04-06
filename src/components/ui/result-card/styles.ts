import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: '#0B0F1C',
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
  value: {
    fontSize: 16,
    color: '#fff',
  },
  valueHighlight: {
    fontSize: 16,
    color: 'orange',
    fontWeight: 'bold',
  },
  precisionText: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 20,
    lineHeight: 20,
  },
})
