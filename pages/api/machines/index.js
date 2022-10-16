import axios from 'redaxios'

const API_URL = process.env.API_URL

export default async function getAllMachines(_req, res) {
  try {
    let { data } = await axios.get(`${API_URL}/machines`)
    data = data.map(({ image, ...rest }) => ({
      ...rest,
      image: image ? image.url : null,
    }))
    return res.json(data)
  } catch (error) {
    console.log({ error })
    return res.json([])
  }
}
