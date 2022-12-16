import Image from 'next/image'
import ClosedChestImage from '../../public/chest_closed-885x505.png'

export function ClosedChest({ width = 500, height = 300 }: { width?: number; height?: number }) {
  return <Image src={ClosedChestImage} alt="closed chest" width={width} height={height} />
}
