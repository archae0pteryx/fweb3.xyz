import { Box } from '@mui/material'
import Image from 'next/image'
import ClosedChestImage from '../../public/chest_closed-885x505.png'
import useMediaQuery from '@mui/material/useMediaQuery'


export function ClosedChest() {
  const smSize = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const medSize = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  let width = 885
  let height = 505
  if (smSize) {
    width = 300
    height = 180
  } else if (medSize) {
    width = 600
    height = 360
  }

  return <Image src={ClosedChestImage} alt="closed chest" width={width} height={height} />
}
