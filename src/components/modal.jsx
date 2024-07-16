import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Fragment, useRef } from 'react';
import { Button, ButtonGroup, DialogActions, TextField } from '@mui/material';
import { updatePhoto } from '../util/dataManager';
import { useDispatch } from 'react-redux';
import { updateSearchSettings, updateSearchType } from '../redux/slices/searchSlice';

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
  display: 'flex',
  flexDirection: 'column',
  p: 3,
};

function BasicModal({ modalStatus, updateModalStatus, searchSettings = false, currentDescription = '', currentId = ''}) {
    const handleClose = () => updateModalStatus(false);
    const descriptionRef = useRef(null);
    const dispatch = useDispatch();

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
                            Order by:
                        </Typography>
                        <ButtonGroup variant="outlined" aria-label="Order selection" sx={{
                            padding: '0 0.1rem',
                            margin: '0.3rem 0'
                        }}>
                            <Button onClick={() => {
                                dispatch(updateSearchSettings('default'));
                            }}>Default</Button>
                            <Button onClick={() => {
                                dispatch(updateSearchSettings('created_at'));
                            }}>Date</Button>
                            <Button onClick={() => {
                                dispatch(updateSearchSettings('width'));
                            }}>Width</Button>
                        </ButtonGroup>
                        <ButtonGroup variant="outlined" aria-label="Order selection" sx={{
                            padding: '0 0.1rem',
                            margin: '0.3rem 0'
                        }}>
                            <Button onClick={() => {
                                dispatch(updateSearchSettings('height'));
                            }}>Height</Button>
                            <Button onClick={() => {
                                dispatch(updateSearchSettings('likes'));
                            }}>Likes</Button>
                        </ButtonGroup>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            Order type:
                        </Typography>
                        <ButtonGroup variant="outlined" aria-label="Order selection" sx={{
                            padding: '0 0.1rem',
                            margin: '0.3rem 0'
                        }}>
                            <Button onClick={() => {
                                dispatch(updateSearchType('asc'));
                            }}>ASC</Button>
                            <Button onClick={() => {
                                dispatch(updateSearchType('desc'));
                            }}>DESC</Button>
                        </ButtonGroup>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
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