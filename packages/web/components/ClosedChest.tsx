import Image from 'next/image'
import Chest from '../public/chest_closed-1024x626.png'

export function ClosedChestImage() {
  return <Image src={Chest} alt="Closed Chest" />
}
