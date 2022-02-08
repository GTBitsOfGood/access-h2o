import * as React from 'react'
import Button from '@material-ui/core/Button'
import classes from './EditInfoSubmissionModal.module.css'
import Modal from '@mui/material/Modal'

interface PropTypes {
  shouldShowModal: boolean
  onClose: () => void
}

export const EditInfoSubmissionModal = ({ shouldShowModal, onClose }: PropTypes): JSX.Element => {
  return (
    <div>
      <div>
        <Modal open={shouldShowModal} onClose={onClose}>
          <div className={classes.modalwrapper}>
            <div>
              <h1>Unsaved Changes</h1>
            </div>
            <div>
                <h3>Leaving this page will discard any changes made. Do you want to save your changes before going back?</h3>
            </div>
            <div>
                <a href="javascript:history.back()"> Discard </a>
                <Button type="button" onClick = {onClose} variant="outlined">
                    View and Save
                </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}