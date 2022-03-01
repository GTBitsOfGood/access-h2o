/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useState } from 'react'
import classes from './Profile.module.css'
import Router from 'next/router'
import { update } from '../../actions/Company'
import urls from 'utils/urls'
import Image from 'next/image'

import Stack from '@mui/material/Stack'
import {
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography
} from '@material-ui/core'

/*
const ProfilePage = ({ json }): JSX.Element => {
  const [company, setCompany] = useState(json)
*/
const ProfilePage = (): JSX.Element => {
  const [company, setCompany] = useState(
    {
      name: '',
      email: '',
      number: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      notes: ''
    }
  )

  const handleUpdate = async (): Promise<void> => {
    const updatedCompany = await update(company)
    console.log(JSON.stringify(updatedCompany))
    setCompany(updatedCompany)
  }
  const handleCancel = (): void => {}

  return (
    <div>
      <div className={classes.profileHeader}>
        <Image width="75" height="75" src="/static/access-h20-logo.jpg" />
        <Stack direction="row" spacing={3}>
          <Button size="small">Add Utility Partner</Button>
          <Button size="small">Edit Form</Button>
          <span className={classes.profilePic}></span>
        </Stack>
      </div>

      <div className={classes.profileContent}>
        <Typography
          variant="button"
          className={classes.profileGrayText}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => await Router.replace(urls.pages.index)}
        >
          <b className={classes.textHover}>&lsaquo; Back to Dashboard</b>
        </Typography>
        <Typography variant="h3">
          <b>Profile</b>
        </Typography>

        <div className={classes.profileForm}>
          <div className={classes.formTitleContainer}>
            <Typography variant="h4">
              <b>Access H2O</b>
              <span className={classes.profileGrayText}>Admin</span>
            </Typography>
          </div>

          <FormControl>
            <div className={classes.formElem}>
              <FormLabel className={classes.formFont} htmlFor="company-input">
                Company Name
              </FormLabel>
              <div className={classes.textElem}>
                <TextField
                  fullWidth
                  id="company-input"
                  variant="outlined"
                  placeholder="AccessH2O"
                  required={true}
                  value={company.name}
                  error={company.name === ''}
                  helperText={company.name === '' ? 'This field is required.' : ''}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                />
              </div>
            </div>

            <div className={classes.formLine}>
              <div className={classes.formElem}>
                <FormLabel className={classes.formFont} htmlFor="email-input">
                  Email Address
                </FormLabel>
                <div className={classes.textElem}>
                  <TextField
                    id="email-input"
                    variant="outlined"
                    placeholder="info@accessh2o.org"
                    required={true}
                    value={company.email}
                    error={company.email === ''}
                    helperText={company.email === '' ? 'This field is required.' : ''}
                    onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  />
                </div>
              </div>
              <div className={classes.formElem}>
                <FormLabel className={classes.formFont} htmlFor="phone-input">
                  Phone Number
                </FormLabel>
                <div className={classes.textElem}>
                  <TextField
                    id="phone-input"
                    variant="outlined"
                    placeholder="(404) 381-1045"
                    required={true}
                    value={company.number}
                    error={company.number === ''}
                    helperText={company.number === '' ? 'This field is required.' : ''}
                    onChange={(e) => setCompany({ ...company, number: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className={classes.formElem}>
              <FormLabel className={classes.formFont} htmlFor="property-input">
                Property Address
              </FormLabel>
              <div className={classes.textElem}>
                <TextField
                  fullWidth
                  id="property-input"
                  variant="outlined"
                  placeholder="885 Woodstock Rd. #430-312"
                  required={true}
                  value={company.address}
                  error={company.address === ''}
                  helperText={company.address === '' ? 'This field is required.' : ''}
                  onChange={(e) => setCompany({ ...company, address: e.target.value })}
                />
              </div>
            </div>
            <div className={classes.formLine}>
              <div className={classes.formElem}>
                <FormLabel className={classes.formFont} htmlFor="city-input">
                  City
                </FormLabel>
                <div className={classes.textElem}>
                  <TextField
                    id="city-input"
                    variant="outlined"
                    placeholder="Roswell"
                    required={true}
                    value={company.city}
                    error={company.city === ''}
                    helperText={company.city === '' ? 'This field is required.' : ''}
                    onChange={(e) => setCompany({ ...company, city: e.target.value })}
                  />
                </div>
              </div>
              <div className={classes.formElem}>
                <FormLabel className={classes.formFont} htmlFor="state-input">
                  State
                </FormLabel>
                <div className={classes.textElem}>
                  <TextField
                    id="state-input"
                    variant="outlined"
                    placeholder="Georgia"
                    value={company.state}
                    error={company.state === ''}
                    helperText={company.state === '' ? 'This field is required.' : ''}
                    onChange={(e) => setCompany({ ...company, state: e.target.value })}
                  />
                </div>
              </div>
              <div className={classes.formElem}>
                <FormLabel className={classes.formFont} htmlFor="zip-input">
                  Zip
                </FormLabel>
                <div className={classes.textElem}>
                  <TextField
                    id="zip-input"
                    variant="outlined"
                    placeholder="30075"
                    error={company.zip === ''}
                    helperText={company.zip === '' ? 'This field is required.' : ''}
                    value={company.zip}
                    onChange={(e) => setCompany({ ...company, zip: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className={classes.formElem}>
              <FormLabel className={classes.formFont} htmlFor="notes-input">
                Notes (Optional)
              </FormLabel>
              <div className={classes.textElem}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  id="notes-input"
                  variant="outlined"
                  value={company.notes}
                  onChange={(e) => setCompany({ ...company, notes: e.target.value })}
                />
              </div>
            </div>

            <Stack
              className={classes.formSubmitContainer}
              direction="row-reverse"
              alignItems="flex-end"
              spacing={2}
            >
              <Button variant="contained" onClick={handleUpdate}>Update</Button>
              <Button variant="text" onClick={handleCancel}>Cancel</Button>
            </Stack>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

/*
ProfilePage.getInitialProps = async ({ query }) => {
  const company = await getCompany(query.accountId)
  return { json: company }
}
*/
export default ProfilePage