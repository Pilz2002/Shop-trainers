import AlertMui from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Alert({message = "", type = "success"}) {
  return ( 
      <Stack sx={{width: "300px", position: "fixed", bottom: "20px", left: "10px", zIndex: "100000000"}}>
        <AlertMui variant="filled" severity={type} >
          { message }
        </AlertMui>
      </Stack>
  );
}

export default Alert;