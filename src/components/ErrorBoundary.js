import React, { Component } from 'react';
import { useSnackbar } from 'notistack';  // Import useSnackbar hook

// Create a Higher Order Component to wrap ErrorBoundary with useSnackbar
class ErrorBoundary extends Component {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error) {
    // Prepare the state with the error details to display them
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    // Log the error details for debugging purposes
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    const { hasError, errorMessage } = this.state;
    
    if (hasError) {
      // Use the Snackbar to show the error message
      return (
        <div className="text-center p-4">
          {/* Display the error message in a Snackbar */}
          <ErrorSnackbar errorMessage={errorMessage} />
        </div>
      );
    }

    // Return the child components if no error
    return this.props.children;
  }
}

// Function component to use Snackbar for displaying error
const ErrorSnackbar = ({ errorMessage }) => {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    // Show error message in Snackbar
    if (errorMessage) {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        style: {
          backgroundColor: '#ffb8b8',  // Error color
        },
      });
    }
  }, [errorMessage, enqueueSnackbar]);

  return null;  // This component doesn't render anything itself
};

export default ErrorBoundary;
