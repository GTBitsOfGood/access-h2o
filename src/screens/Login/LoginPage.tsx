/* eslint-disable @typescript-eslint/no-misused-promises, @typescript-eslint/strict-boolean-expressions */

import React, { useState } from 'react'
import Router from 'next/router'
import { login, getCurrentUser } from '../../actions/User'
import urls from '../../../utils/urls'
import classes from './LoginPage.module.css'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { OutlinedInput } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import { NextPageContext } from 'next'

const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isRegistering] = useState(false)

  const handleClickShowPassword = (): void => setShowPassword(!showPassword)
  const handleMouseDownPassword = (): void => setShowPassword(!showPassword)

  const handleSubmit = (event: { preventDefault: () => void }): any => {
    event.preventDefault()

    // if (isRegistering) {
    //   return await signUp(email, password)
    //     .then(async () => await Router.replace(urls.pages.index))
    //     .catch((error) => window.alert(error.message))
    // }

    return (
      login(email, password)
        .then(
          async () => {
            /*
            console.log(json)

            if (Router.query.returnUrl !== null) {
              await Router.push(Router.query.returnUrl as string)
            } else if (!user.isUtilityCompany) {
              await Router.push(urls.pages.accessh2oView.applicants)
            } else {
              await Router.push(urls.pages.utilityView.applicants)
            } */
            Router.reload()
          }
        )
        .catch((error) => window.alert(error.message))
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.logo} />
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.welcomeText}>Welcome!</h2>
        <h3 className={classes.infoText}>
          {isRegistering
            ? 'Register a new account and use our app today!'
            : 'Login to an existing account.'}
        </h3>
        <div className={classes.inputContainer}>
          <label htmlFor="email" className={classes.inputLabel}>
            Email
          </label>
          <TextField
            className={classes.input}
            required
            variant="outlined"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="password" className={classes.inputLabel}>
            Password
          </label>
          <OutlinedInput
            className={classes.input}
            required
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <button className={classes.bttn} type="submit">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  )
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  const req = ctx.req
  const user =
    req != null
      ? await getCurrentUser(req.headers?.cookie)
      : await getCurrentUser(null)

  if (user && (ctx.res != null)) {
    if (!user.isUtilityCompany) {
      ctx.res.writeHead(302, {
        Location: urls.pages.accessh2oView.applicants,
        'Content-Type': 'text/html; charset=utf-8'
      })
      ctx.res.end()
      // Router.push(urls.pages.accessh2oView.applicants)
    } else {
      ctx.res.writeHead(302, {
        Location: urls.pages.utilityView.applicants,
        'Content-Type': 'text/html; charset=utf-8'
      })
      ctx.res.end()
      // Router.push(urls.pages.utilityView.applicants)
    }
  }

  return { }
}

export default LoginPage
