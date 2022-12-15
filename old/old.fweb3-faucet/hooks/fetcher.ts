interface IFetchOpts {
  [key: string]: unknown
}

export async function fetcher(url: string, config: IFetchOpts) {
  try {
    const res = await fetch(url, config)
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
    return {
      status: 'error',
      message: err,
    }
  }
}
