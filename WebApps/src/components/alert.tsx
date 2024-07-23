import { IconButton } from '@mui/material';
import { enqueueSnackbar, SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

export function SuccessAlert(duration: number | null, message: string | ReactNode){
    return enqueueSnackbar(message, {
        autoHideDuration: duration !== null ? duration : 3000,
        variant: 'success'
    })
}

export function InfoAlert(duration: number | null, message: string | ReactNode){
    return enqueueSnackbar(message, {
        autoHideDuration: duration !== null ? duration : 3000,
        variant: 'info'
    })
}

export function ErrorAlert(duration: number | null, message: string | ReactNode){
    return enqueueSnackbar(message, {
        autoHideDuration: duration !== null ? duration : 3000,
        variant: 'error',
    })
}

export function WarningAlert(duration: number | null, message: string | ReactNode){
    return enqueueSnackbar(message, {
        autoHideDuration: duration !== null ? duration : 3000,
        variant: 'warning'
    })
}

export function SnackbarCloseButton({ snackbarKey }: {snackbarKey: SnackbarKey}) {
    const { closeSnackbar } = useSnackbar();
  
    return (
      <IconButton onClick={() => closeSnackbar(snackbarKey)}>
        <IoMdClose style={{color: 'white'}}/>
      </IconButton>
    );
  }