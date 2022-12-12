import { useState, createContext, useContext, ReactNode, ComponentType } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Slide, { SlideProps } from '@mui/material/Slide'
import { Alert, AlertColor } from '@mui/material'

type TransitionProps = Omit<SlideProps, 'direction'>

interface IToastOpts {
  hideIn?: number
  severity?: AlertColor
}

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />
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
  const [transition, setTransition] = useState<ComponentType<TransitionProps> | undefined>(undefined)

  const triggerToast = (message: string, overrides = DEFAULT_OPTS) => {
    setMessage(message)
    setOpts({ ...DEFAULT_OPTS, ...overrides })
    setTransition(() => TransitionRight)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setMessage('')
    setOpts(DEFAULT_OPTS)
  }

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      <Snackbar
        autoHideDuration={opts.hideIn}
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message={message}
        key={transition ? transition.name : ''}
      >
        <Alert variant="filled" onClose={handleClose} severity={opts.severity}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
