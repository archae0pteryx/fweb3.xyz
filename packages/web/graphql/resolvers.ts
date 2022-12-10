export const resolvers = {
  Query: {
    users: () => {
      return [
        {
          id: '1',
          address: '0x123',
        },
      ]
    },
  },
}
