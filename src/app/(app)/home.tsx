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
import { uploadImageToConsultation } from '@/services/http/consultations/upload-image-to-consultation'
import { uploadImage } from '@/services/http/images/upload-image'
import { StyleSheet } from 'react-native'
import { useConsultation } from '@/contexts/consultation-context'
import { ResultCard } from '@/components/ui/result-card'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { ConsultationResult } from '@/services/http/consultations/get-consultation-by-id'

export default function Home() {
  const { consultationId } = useLocalSearchParams()

  const {
    addConsultation,
    setImageId,
    imageId,
    messages,
    previewImage,
    setPreviewImage,
    consultationResults,
    updateResultData,
    loadConsultation,
  } = useConsultation()

  useEffect(() => {
    if (consultationId) {
      loadConsultation(consultationId as string)
    }
  }, [consultationId])

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
        formData.append('appointment_id', consultationId as string)

        try {
          const response = await uploadImage(formData)

          if (response) {
            console.log('Id da imagem: ', response.image.id)
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
        const response = await uploadImageToConsultation(imageId)

        if (response) {
          // Get the first result from the array
          const firstResult = response.updatedAppointment.resultado[0]

          if (firstResult) {
            const consultationResult: ConsultationResult = {
              acne_quantity: firstResult.acne_quantity,
              iga_score: firstResult.iga_score,
              image: firstResult.image,
              image_path: firstResult.image_path,
            }
            updateResultData(consultationResult)
          }
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
              const result = consultationResults[index]

              if (result) {
                console.log('Image path:', result.image)
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
                            uri: `http://200.129.17.134:3456${result.image_path}`,
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Usa 'cover' para preencher toda a tela
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    maxWidth: '75%',
  },
  messageResultContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gray[100],
    padding: 8,
    borderRadius: 10,
    maxWidth: '75%',
    marginTop: 16,
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
  messageArea: {
    width: '100%',
    padding: 8,
  },
})
