import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ShareMenu from 'react-native-share-menu';

export default function AddTutosShare() {

  const [sharedData, setSharedData] = useState<string | null>(null);

  const handleShare = useCallback((item: any) => {
    console.log(item.data);
    if (!item) {
      return;
    }

    setSharedData(item.data);
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      <Text>AddTutosShare</Text>
    </View>
  )
}