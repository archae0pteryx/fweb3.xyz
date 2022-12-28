const hasUrl = !!process.env.NEXT_PUBLIC_VERCEL_URL

export const API_ENDPOINT = hasUrl ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api` : 'http://localhost:3000/api'
