import prisma from './client'

export async function seedFeature() {
  try {
    await prisma.feature.createMany({
      data: [
        {
          flag: 'use_maintenance',
          value: false,
        },
        {
          flag: 'use_openai',
          value: true,
        },
        {
          flag: 'use_email',
          value: false,
        },
      ],
    })
    console.log('seeded features')
  } catch (err) {
    console.error(err)
  }
}
