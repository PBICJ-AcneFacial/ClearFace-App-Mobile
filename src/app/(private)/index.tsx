import * as React from 'react'
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { ImageUpIcon } from 'lucide-react-native'
import { colors, fontFamily } from '@/styles/theme'
import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createConsultation } from '@/services/http/consultations/create-consultation'

export default function Home() {
  const [messages, setMessages] = React.useState<
    { type: 'image'; uri: string }[]
  >([])
  const [previewImage, setPreviewImage] = React.useState<string | null>(null)
  const [imageId, setImageId] = React.useState('')

  const handlePickerImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita que sua aplicação acesse as imagens'
      )
    } else {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ['images'],
        base64: false,
        aspect: [4, 4],
        quality: 1,
      })

      if (canceled) {
        ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT)
      } else {
        const filename = assets[0].uri.substring(
          assets[0].uri.lastIndexOf('/') + 1,
          assets[0].uri.length
        )

        const extend = filename.split('.')[1]
        const formData = new FormData()
        formData.append(
          'FaceImage',
          JSON.parse(
            JSON.stringify({
              name: filename,
              uri: assets[0].uri,
              type: 'image/' + extend,
            })
          )
        )
        setPreviewImage(assets[0].uri)

        try {
          const token = await AsyncStorage.getItem('@token')
          const response = await api.post('/images', formData, {
            headers: {
              // Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })

          setImageId(response.data.image.id)

          if (response.data.error) {
            Alert.alert(
              'Erro',
              'Não foi possivel enviar sua imagem. Por favor, tente novamente mais tarde!'
            )
          } else {
            Alert.alert('Sucesso 🎉', 'Sua imagem foi enviada com sucesso!')
          }
        } catch (err) {
          alert('Erro ao enviar sua imagem')
          console.log(err)
        }
      }
    }
  }

  async function sendImage() {
    if (previewImage) {
      setMessages((prev) => [...prev, { type: 'image', uri: previewImage }])
      setPreviewImage(null)

      const response = await createConsultation(imageId)
      console.log('Consulta criada!')
      console.log(response)
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
          onPress={previewImage === null ? handlePickerImage : sendImage}
          style={styles.button}
        >
          <Text style={styles.buttonText} numberOfLines={1}>
            {previewImage ? previewImage.split('/').pop() : 'Adicionar Imagem'}
          </Text>
          <ImageUpIcon color={colors.gray[50]} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[200],
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  messageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.gray[900],
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
    backgroundColor: colors.gray[900],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
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
  },
  buttonText: {
    color: colors.gray[50],
    marginRight: 8,
    fontSize: 20,
    fontFamily: fontFamily.regular,
    maxWidth: 280,
  },
})
