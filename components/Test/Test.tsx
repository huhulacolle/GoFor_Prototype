import { View, Text } from 'react-native'
import React, { useState } from 'react'
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Button } from 'react-native-paper';
import { LinkPreview } from '@flyerhq/react-native-link-preview';

export default function Test() {

  const [image, setImage] = useState("");

  async function generateImg(): Promise<void> {
    const test = await VideoThumbnails.getThumbnailAsync("https://www.youtube.com/watch?v=ocbpHB8DspE")
    console.log(test);
  }

  function vide() {
    return <Text></Text>
  }

  return (
    <View>
      <Button mode="contained" onPress={generateImg}>test</Button>
      <LinkPreview text='https://www.youtube.com/watch?v=AGI9HykaIas' renderDescription={vide} renderText={vide} renderTitle={vide} />
      <LinkPreview text='https://twitter.com/surgeon18012021/status/1630164102143148033' />
    </View>
  )
}