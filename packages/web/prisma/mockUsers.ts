import { Role } from "@prisma/client"

export const ADMIN_USER = {
  email: 'admin@email.com',
  address: '0x427b534A1678b1d21bd65cbeFd06aD51533418Be',
  verified: true,
  role: 'ADMIN' as Role,
}

export const PLAYER_USER = {
  email: 'player@email.com',
  address: '0x8808eDE13031c83b971bF2449E6E587Ca2CfA8C4',
  verified: true,
}

export const XENU_USER = {
  email: 'aarchaeopteryxx@gmail.com',
  address: '0xe247a54a7968bE1dCbB65413CdCe18948e6bC19D',
  verified: true
}

export const MOD_USER = {
  email: 'mod@email.com',
  address: 'foobar',
  verified: true,
}
