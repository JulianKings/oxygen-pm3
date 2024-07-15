import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Fragment, useRef } from 'react';
import { Button, DialogActions, TextField } from '@mui/material';
import { updatePhoto } from '../util/dataManager';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FFFFFF',
  color: 'black',
  border: '0.06rem solid #272727',
  boxShadow: 24,
  p: 4,
};

function BasicModal({ modalStatus, updateModalStatus, searchSettings = false, currentDescription = '', currentId = ''}) {
    const handleClose = () => updateModalStatus(false);
    const descriptionRef = useRef(null);

    return (<div>
        <Modal
            open={modalStatus}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            {(searchSettings) ? 
                <Fragment>
                    <Box sx={style}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            Search Settings
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Fragment> :
                <Fragment>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Description
                        </Typography>
                        <TextField
                            inputRef={descriptionRef}
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            defaultValue={currentDescription}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => {
                                if(descriptionRef.current.value)
                                {
                                    updatePhoto(currentId, 'description', descriptionRef.current.value)
                                }
                                handleClose();
                            }}type="submit">Save</Button>
                        </DialogActions>
                    </Box>
                </Fragment>
            }
        </Modal>
    </div>);
}

BasicModal.propTypes = {
    modalStatus: PropTypes.bool,
    updateModalStatus: PropTypes.func,
    searchSettings: PropTypes.bool,
    currentDescription: PropTypes.string,
    currentId: PropTypes.string
}

export default BasicModal;