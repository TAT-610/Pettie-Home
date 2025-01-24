import { FlatList } from 'react-native'
import React from 'react'
import EditProfileShop from '../../../components/ShopScreen/profile/EditProfileShop'

export default function editprofile() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListFooterComponent={() => (
        <>
          <EditProfileShop />
        </>
      )}
    />
  )
}