import { useState, createContext, useContext, ReactNode } from 'react'
import MuiAlert, { AlertProps, type AlertColor } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'

const ToastContext = createContext({
  triggerToast: (_message: string, _severity?: AlertColor) => {},
})

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [message, setMessage] = useState<string>('')

  const triggerToast = (message: string, severity: AlertColor = 'success') => {
    setSeverity(severity)
    setMessage(message)
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    setMessage('')
  }

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        onClose={handleClose}
        message={message}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
