const ABOUT_PROMPT = `Write a markdown formatted page describing the importance of onboarding people into the web3 space. Include bullet points explaining the benefits of the technology. Explain that you will learn how to properly connect a wallet and what an NFT is by playing this game.`

const GAME_TASKS = `Write a markdown formatted list of instructions for how to play the game. Include the following steps: 1. Create and connect a wallet 2. Get game tokens 3. Find your game token transaction on the block explorer and learn gas. Interact with a contract through the explorer. 4. Look up transactions on the explorer.`

export const PROMPTS: { [key: string]: string } = {
  about: ABOUT_PROMPT,
  onboarding: GAME_TASKS,
}
