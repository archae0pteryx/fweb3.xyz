export const createVerifyHtml = (verifyUrl: string) => `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
    <style>
      body {
        background: #090404;
      }
      .container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: radial-gradient(250.76% 87.91% at 50% 50%, #333333 13.54%, #090404 100%);
      }
      a {
        border: none;
        font-size: 1.3em;
        padding: 1rem;
        background: #444048;
        box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.5);
        border-radius: 7px;
        width: 25%;
        font-family: 'Menlo';
        font-style: normal;
        font-weight: 700;
        font-size: 23px;
        line-height: 27px;
        color: #bdbdbd;
        text-align: center;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="${verifyUrl}">Verify Email</a>
    </div>
  </body>
</html>
`
