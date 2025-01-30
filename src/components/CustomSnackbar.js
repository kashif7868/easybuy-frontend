import React from 'react';
import { useSnackbar } from 'notistack';

const CustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSuccess = () => {
    enqueueSnackbar('Success message!', {
      variant: 'success',
      style: {
        backgroundColor: '#63e699', // Success color
      },
    });
  };

  const handleError = () => {
    enqueueSnackbar('Error message!', {
      variant: 'error',
      style: {
        backgroundColor: '#ffb8b8', // Error color
      },
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <button
        onClick={handleSuccess}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Show Success Snackbar
      </button>
      <button
        onClick={handleError}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Show Error Snackbar
      </button>
    </div>
  );
};

export default CustomSnackbar;
