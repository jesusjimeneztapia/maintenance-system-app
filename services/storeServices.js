import axios from 'redaxios'

export async function deleteStoreById(storeId) {
  const { data } = await axios.delete(`/api/stores/${storeId}`)
  return data
}
