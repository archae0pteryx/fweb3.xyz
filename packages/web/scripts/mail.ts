import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()
const fromEmail = 'mail@fweb3.xyz'
const email = 'aarchaeopteryxx@gmail.com'
async function main() {
  AWS.config.update({ region: 'us-west-2' })
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: process.env.FWEB3_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.FWEB3_AWS_SECRET_ACCESS_KEY || '',
  })
let params = {
  Destination: {
    /* required */
    ToAddresses: [email /* more items */],
  },
  Message: {
    /* required */
    Body: {
      /* required */
      Html: {
        Charset: 'UTF-8',
        Data: `<h3>Hi $\{name\}!</h3><br/>
<p>Your OTP for Something Something Service Hub is:<em> $\{otp\}</em>
</p><br/>
<p>Regards,<br/>
Something Something Service Hub Team</p>
`,
      },
      Text: {
        Charset: 'UTF-8',
        Data: `Hi  $\{name\}!Your Login OTP is $\{otp\}`,
      },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: `$\{otp\} is the  OTP for Something Something Service Hub!`,
    },
  },
  Source: fromEmail,
  /* required */
  ReplyToAddresses: [fromEmail /* more items */],
}
  const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  await sendPromise
  console.log({ sendPromise })
}

main().then(console.log).catch(console.error)
