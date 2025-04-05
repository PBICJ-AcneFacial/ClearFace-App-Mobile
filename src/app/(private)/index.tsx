import * as ImagePicker from 'expo-image-picker'
import * as React from 'react'
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  ToastAndroid,
  ImageBackground,
} from 'react-native'
import { ImageUpIcon } from 'lucide-react-native'
import { colors, fontFamily } from '@/styles/theme'
import { createConsultation } from '@/services/http/consultations/create-consultation'
import { uploadImage } from '@/services/http/images/upload-image'
import { styles } from './styles'
import { useConsultation } from '@/contexts/consultation-context'
import { ResultCard } from '@/components/ui/result-card'

export default function Home() {
  // const [messages, setMessages] = React.useState<
  //   { type: 'image'; uri: string }[]
  // >([])
  // const [previewImage, setPreviewImage] = React.useState<string | null>(null)
  // const [imageId, setImageId] = React.useState('')

  const {
    addConsultation,
    setImageId,
    imageId,
    messages,
    previewImage,
    setPreviewImage,
    resultData,
    updateResultData,
  } = useConsultation()

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
          const response = await uploadImage(formData)

          if (response) {
            setImageId(response.image.id)
            Alert.alert('Sucesso 🎉', 'Sua imagem foi enviada com sucesso!')
          } else {
            Alert.alert(
              'Erro',
              'Não foi possível enviar sua imagem. Tente novamente mais tarde!'
            )
          }
        } catch {
          Alert.alert('Erro', 'Falha ao enviar a imagem.')
        }
      }
    }
  }

  async function sendImage() {
    if (previewImage && imageId) {
      addConsultation(previewImage)
      setPreviewImage(null)

      try {
        const response = await createConsultation(imageId)
        console.log('Consulta criada!', response)

        if (response) {
          updateResultData(response) // Armazena os dados retornados
        }
      } catch (err) {
        console.error('Erro ao criar consulta:', err)
      }
    } else {
      Alert.alert('Atenção', 'Nenhuma imagem foi enviada ainda.')
    }
  }

  return (
    <View style={styles.background}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../../assets/images/background.png')}
      >
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {messages.map((msg, index) => {
              const result = resultData[index]

              if (result) {
                console.log('Image path:', result.resultado.image)
              }

              return (
                <View key={index} style={styles.messageArea}>
                  <View style={styles.messageContainer}>
                    <Image
                      source={{ uri: msg.uri }}
                      style={styles.messageImage}
                    />
                  </View>
                  {result && (
                    <>
                      <View style={styles.messageResultContainer}>
                        <Image
                          source={{
                            uri: `http://200.129.17.134:3456${result.resultado.image_path}`,
                          }}
                          style={styles.messageImage}
                        />
                      </View>
                      <ResultCard result={result} />
                    </>
                  )}
                </View>
              )
            })}
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
                {previewImage
                  ? previewImage.split('/').pop()
                  : 'Adicionar Imagem'}
              </Text>
              <ImageUpIcon color={colors.gray[50]} size={32} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
