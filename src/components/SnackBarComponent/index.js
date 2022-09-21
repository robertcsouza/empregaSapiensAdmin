import MDSnackbar from "components/MDSnackbar";
function SnackBarComponent({ open, closeSnack, content }) {
  switch (content.type) {
    case 'success':
      return <MDSnackbar
        color="success"
        icon="check"
        title={content.title}
        content={content.body}
        dateTime={content.dateTime}
        open={open}
        onClose={closeSnack}
        close={closeSnack}
        bgWhite
      />


    case 'warning':
      return <MDSnackbar
        color="warning"
        icon="warning"
        title={content.title}
        content={content.body}
        dateTime={content.dateTime}
        open={open}
        onClose={closeSnack}
        close={closeSnack}
        bgWhite
      />

    case 'error':
      return <MDSnackbar
        color="error"
        icon="warning"
        title={content.title}
        content={content.body}
        dateTime={content.dateTime}
        open={open}
        onClose={closeSnack}
        close={closeSnack}
        bgWhite
      />


    default:
      return <div></div>

  }
}

export default SnackBarComponent;