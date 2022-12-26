import { Box, Typography } from '@mui/material'

function Error({ statusCode }: { statusCode: number }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <Typography>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      </Typography>
    </Box>
  )
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
