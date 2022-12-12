import Image from 'next/image'
import ClosedChestImage from '../public/chest_closed-1024x626.png'

export function ClosedChest() {
  return (
    <div>
      <Image
        src={ClosedChestImage}
        alt="closed chest"
        width={1024}
        height={626}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
