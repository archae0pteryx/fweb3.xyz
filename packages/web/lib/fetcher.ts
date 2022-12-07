export async function fetcher(...args: any) {
  try {
    const res = await fetch(args)
    const json = await res.json()
    return json
  } catch (err) {
    console.error(err)
    return null
  }
}
