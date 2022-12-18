import { useState, createContext, useContext, ReactNode } from 'react'
import Alert, { type AlertColor } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

interface IAlertOpts {
  hideIn?: number
  severity?: AlertColor
}

const AlertContext = createContext({
  triggerToast: (_message: string, _opts?: IAlertOpts) => {},
})

const DEFAULT_OPTS: IAlertOpts = {
  hideIn: 3000,
  severity: 'success' as AlertColor,
}

export function AlertProvider({ children }: { children: ReactNode }) {
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
    <AlertContext.Provider value={{ triggerToast }}>
      {children}
      <Snackbar
        autoHideDuration={opts.hideIn}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={open}
        onClose={handleClose}
        message={message}
      >
        <Alert variant="outlined" onClose={handleClose} severity={opts.severity}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  )
}

export const useToast = () => useContext(AlertContext)
