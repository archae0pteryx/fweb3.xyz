import { useState, createContext, useContext, ReactNode } from 'react'
import Alert, { type AlertColor } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

interface IToastOpts {
  hideIn?: number
  severity?: AlertColor
}

const ToastContext = createContext({
  triggerToast: (_message: string, _opts?: IToastOpts) => {},
})

const DEFAULT_OPTS: IToastOpts = {
  hideIn: 3000,
  severity: 'success' as AlertColor,
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [opts, setOpts] = useState(DEFAULT_OPTS)

  const triggerToast = (message: string, overrides = DEFAULT_OPTS) => {
    setMessage('')
    setOpts({ ...DEFAULT_OPTS, ...overrides })
    setMessage(message)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      <Snackbar
        autoHideDuration={opts.hideIn}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        message={message}
      >
        <Alert variant="outlined" onClose={handleClose} severity={opts.severity}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
