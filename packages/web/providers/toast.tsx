import { useState, createContext, useContext, ReactNode, ComponentType } from 'react'
import Alert, { type AlertColor } from '@mui/material/Alert'
import Slide, { type SlideProps } from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

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
    setOpts({ ...DEFAULT_OPTS, ...overrides })
    setMessage(message)
    setTransition(() => TransitionRight)
    setOpen(true)
    setTimeout(() => {
      _reset()
    }, overrides.hideIn)
  }

  const handleClose = () => {
    _reset()
  }

  const _reset = () => {
    setOpts(DEFAULT_OPTS)
    setOpen(false)
    setMessage('')
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
