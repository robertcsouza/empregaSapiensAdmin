/*
 const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const closeSnack = () => setSnackOpen(false);
  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };
openSnack({ type: 'success', title: "Candidatado com sucesso", body: "Sucesso ao candidatar-se a vaga,Boa Sorte :)", dateTime: "1 min ago" });
 <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
*/

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