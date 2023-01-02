export {}
// import { AdminLayout } from '../../components/Layouts/AdminLayout'
// import { Flex } from '../../components/shared/Boxes'
// import { FormGroup, ToggleButton, Typography } from '@mui/material'
// import { LoadingButton } from '../../components/shared/Buttons'
// import { useQuery } from '@apollo/client'
// import { useState } from 'react'
// import { useUser, useNetwork, useToast, ALL_FEATURES, useFeature } from '../../providers'
// import Box from '@mui/material/Box'
// import TextField from '@mui/material/TextField'

// function DebugInput(props: any) {
//   return <TextField size="small" margin="dense" {...props} />
// }

// function Toggle(props: any) {
//   return <ToggleButton {...props}>{props.text}</ToggleButton>
// }

// function FeaturesList() {
//   const [enabled, setEnabled] = useState<string[]>([])
//   const handleEnable = (flag: string) => {
//     setEnabled([...enabled, flag])
//   }
//   const { loading, error, data } = useQuery(ALL_FEATURES)
//   return !loading ? (
//     data.allFeatures?.map((f: any) => {
//       const flag = f.flag
//       const enabled = f.value === 'true'
//       return <Toggle key={flag} value={enabled} text={flag} selected={enabled} onChange={() => handleEnable(flag)} />
//     })
//   ) : (
//     <Typography>Loading...</Typography>
//   )
// }

// export default function AdminPage() {
//   const net = useNetwork()
//   const { address, role, verified, disabled, updateUser, loading, onboarding, id } = useUser()
//   const [updateRole, setRole] = useState(role || '')
//   const [updateVerified, setVerified] = useState<boolean>(verified)
//   const [updateDisabled, setDisabled] = useState<boolean>(disabled)
//   const { triggerToast } = useToast()
//   const [flag, setFlag] = useState<string>('')

//   const handleUpdate = async () => {
//     await updateUser({
//       address: address,
//       role: updateRole,
//       verified: updateVerified,
//       disabled: updateDisabled,
//     })
//     if (flag) {
//     }
//     triggerToast('Updated')
//   }

//   return loading ? (
//     <Flex>
//       <Typography>Loading...</Typography>
//     </Flex>
//   ) : (
//     <AdminLayout>
//       <Box>
//         <FeaturesList />
//         {id ? (
//           <FormGroup>
//             <DebugInput label="address" value={address} onChange={(e: any) => setFlag(e.targe.value)} />
//             <DebugInput label="role" value={updateRole} onChange={(e: any) => setRole(e.target.value)} />
//             <DebugInput label="net" value={net.chain?.name} disabled />
//             <Box sx={{ justifyContent: 'space-between', margin: '0.5rem 0', padding: 0 }}>
//               <Toggle
//                 color="info"
//                 value="verified"
//                 text="verified"
//                 selected={updateVerified}
//                 onChange={() => setVerified(!updateVerified)}
//               />
//               <Toggle
//                 color="info"
//                 variant="contained"
//                 value="disabled"
//                 text="disabled"
//                 selected={updateDisabled}
//                 onChange={() => setDisabled(!updateDisabled)}
//               />
//             </Box>
//             <Typography marginY={1} variant="caption">
//               Onboarding: {JSON.stringify(onboarding)}
//             </Typography>
//             <LoadingButton loading={loading} color="warning" variant="outlined" onClick={handleUpdate}>
//               Update
//             </LoadingButton>
//           </FormGroup>
//         ) : (
//           <Typography>user not found: {address}</Typography>
//         )}
//       </Box>
//     </AdminLayout>
//   )
// }
