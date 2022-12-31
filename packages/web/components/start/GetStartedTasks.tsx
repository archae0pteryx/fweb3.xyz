// import { Box, Typography, useTheme } from '@mui/material'
// import { useUser } from '../../providers'
// import { useRouter } from 'next/router'
// import { BodyText, SubHeading, SmallText, LargeText } from '../shared/Typography'
// import { Button } from '../shared/Buttons'
// import { BsCheckCircle } from 'react-icons/bs'
// import { VscError } from 'react-icons/vsc'

export function Foo() {
  return <></>
}

// function StepInfoBox({ children, checked = false }: { children: React.ReactNode; checked?: boolean }) {
//   const theme = useTheme()
//   return (
//     <Box display="flex" justifyContent="flex-start" alignItems="center">
//       {checked ? (
//         <Typography
//           variant="h4"
//           sx={{
//             marginRight: theme.spacing(2),
//             color: theme.palette.success.main,
//           }}
//         >
//           <BsCheckCircle />
//         </Typography>
//       ) : (
//         <Typography
//           variant="h4"
//           sx={{
//             marginRight: theme.spacing(2),
//             color: theme.palette.error.main,
//           }}
//         >
//           <VscError />
//         </Typography>
//       )}
//       {children}
//     </Box>
//   )
// }

// export function GetStartedTasks() {
//   const { isConnected, connectUser, isValidUser, onboarding } = useUser()
//   const router = useRouter()
//   const theme = useTheme()

//   const handleStartGame = async () => {
//     if (!isConnected) {
//       await connectUser()
//     }

//     if (onboarding) {
//       router.push('/onboard')
//       return
//     }

//     if (!isValidUser) {
//       router.push('/verify')
//       return
//     }
//     router.push('/game')
//     return
//   }

//   return (
//     <Box>
//       <Box
//         sx={{
//           marginX: theme.spacing(8),
//           marginY: theme.spacing(3),
//         }}
//       >
//         <BodyText color="secondary" variant="h4" marginX={0} marginTop={5}>
//           Get started
//         </BodyText>
//         <StepInfoBox checked={isConnected}>
//           <SmallText>{onboarding ? 'Install a browser wallet' : 'Connect your wallet'}</SmallText>
//         </StepInfoBox>
//         <StepInfoBox checked={isValidUser}>
//           <SmallText>Verify you&apos;re not a bot</SmallText>
//         </StepInfoBox>
//         <StepInfoBox>
//           <SmallText>Down the rabbit hole...</SmallText>
//         </StepInfoBox>
//         <Box display="flex" marginY={5} justifyContent="center">
//           {onboarding ? <Button>Install wallet</Button> : <Button onClick={() => handleStartGame()}>Lets go</Button>}
//         </Box>
//       </Box>
//     </Box>
//   )
// }
