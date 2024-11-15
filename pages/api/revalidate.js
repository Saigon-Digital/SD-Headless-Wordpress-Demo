import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
  const { pageSlug } = req.body

  if (req.method === 'POST' && pageSlug) {
    try {
      // Revalidate the specific page based on the slug received
      await res.revalidate(`/${pageSlug}`)
      console.log('Revalidated ${pageSlug} =================>', pageSlug)
      return res.json({
        revalidated: true,
        message: `Revalidated ${pageSlug}`,
      })
    } catch (err) {
      console.log('🚀 ~ err:', err)
      return res.status(500).json({ error: 'Failed to revalidate', err })
    }
  }

  return res.status(400).json({ error: 'Invalid request' })
}
