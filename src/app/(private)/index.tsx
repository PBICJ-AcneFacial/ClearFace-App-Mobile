import * as React from 'react'
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Upload as ImageUp } from 'lucide-react-native'
import { useLocalSearchParams } from 'expo-router'

export default function Home() {
  const { id } = useLocalSearchParams()

  const [messages, setMessages] = React.useState<
    { type: 'image'; uri: string }[]
  >([])
  const [previewImage, setPreviewImage] = React.useState<string | null>(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri)
    }
  }

  function sendImage() {
    if (previewImage) {
      setMessages((prev) => [...prev, { type: 'image', uri: previewImage }])
      setPreviewImage(null)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
            <Image source={{ uri: msg.uri }} style={styles.messageImage} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.uploadContainer}>
        {previewImage && (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: previewImage }}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 16 / 9,
                borderRadius: 12,
              }}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={previewImage === null ? pickImage : sendImage}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {previewImage ? previewImage.split('/').pop() : 'Adicionar Imagem'}
          </Text>
          <ImageUp color='#fff' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  messageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#1F2937',
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '75%',
  },
  messageImage: {
    width: 200,
    height: 120,
    borderRadius: 8,
  },
  uploadContainer: {
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 16,
  },
  previewContainer: {
    padding: 2,
    borderRadius: 24,
    gap: 12,
  },
  previewImage: {
    height: 200,
    borderRadius: 12,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    // backgroundColor: '#1E1E1E',
  },
  buttonText: {
    color: '#fff',
    marginRight: 8, // Adiciona um espaço entre o texto e o ícone
  },
})
