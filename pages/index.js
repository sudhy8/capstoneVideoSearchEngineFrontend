import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Poppins } from 'next/font/google';
import SearchResult from "./searchResult/searchResult"
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { useState, useRef } from 'react';
// import { SearchRoundedIcon, SearchOutlinedIcon } from '@material-ui/icons-material';
import axios from 'axios';


import PropTypes from 'prop-types';
import clsx from 'clsx';
import { css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';


import ReactPlayer from 'react-player';

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};


const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],

});
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  fontFamily: 'poppins',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    border: "solid 2px #dadaff",
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '200px',
      width: "200px",
      '&:focus': {
        maxWidth: '400px',
        width: '400px'
      },
    },
  },
}));

export default function SearchAppBar() {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);


  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus(true)
      const response = await fetch('http://127.0.0.1:5000/videoSplitter', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful response
        console.log('Video uploaded successfully');
      } else {
        // Handle error response
        console.error('Error uploading video');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
    setStatus(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)


    }, 4000);
    handleClose()

  };


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };




  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const SearchButton = styled(Button)(({ theme }) => ({
    height: '100%',
    marginLeft: theme.spacing(2),
  }));

  const handleSearch = async () => {
    console.log('Searching for:', searchTerm);
    setResult([])

    try {
      const response = await axios.get(`http://127.0.0.1:5000/search/${encodeURIComponent(searchTerm)}`);
      console.log(response?.data)
      setResult(response?.data)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }

  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <style jsx global>{`
        html {
          font-family: ${poppins};
        }
      `}</style>
      <AppBar position="static" style={{ backgroundColor: "White", boxShadow: "none" }}>
        <Toolbar>
          <Grid container style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <Grid style={{ width: "auto" }} item container>
              <Grid item>
                <img style={{ width: "42px" }} src="https://invideosearchbucket.s3.us-west-2.amazonaws.com/search.gif" />

              </Grid>
              <Grid item>
                <p style={{
                  color: "black", fontWeight: "500",
                  padding: "3px 10px",
                  fontSize: "20px",
                }}>Mr.Search</p>

              </Grid>
            </Grid>
            <Grid style={{ width: "auto" }} item container>
              <Grid item>
                {/* <Search>
                  <SearchIconWrapper>
                    <SearchRoundedIcon style={{ color: 'black' }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search> */}
                <Search>


                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                  {/* <SearchButton variant="contained" color="primary" onClick={handleSearch}>
                    <SearchRoundedIcon />
                  </SearchButton> */}
                  <SearchButton variant="contained" onClick={handleSearch} style={{
                    height: "40px",
                    right: "0px",
                    position: "absolute"
                  }}>
                    <SearchIconWrapper >
                      <SearchRoundedIcon style={{ color: 'black' }} />
                    </SearchIconWrapper>
                  </SearchButton>

                </Search>
              </Grid>
              <Grid item style={{
                padding: "3px 13px"
              }}>
                <Button variant="outlined" style={{ color: "#1D2FE1" }} onClick={handleOpen} startIcon={<CloudUploadRoundedIcon />}>
                  Upload
                </Button>
              </Grid>


            </Grid>
          </Grid>



        </Toolbar>
      </AppBar>

      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        {
          !success ?
            <ModalContent sx={{ width: "90vw", height: "auto" }}>
              <Grid container>
                <Grid item style={{ margin: "20px", padding: "20px", borderRadius: '10px', border: "dashed 1px blue", width: "100%" }}>
                  {/* <form action="http://127.0.0.1:5000/videoSplitter" method="post" enctype="multipart/form-data" style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: " space-between"
              }}>
                <input type="file" name="file" id="upload" style={{
                  width: "100%",
                  margin: "10px 0px",
                  padding: "10px",
                  background: "#001cff17"
                }} />
                
                <div style={{ width: "100%", display: "flex", justifyContent:"flex-end"}}>
                  <input type="submit" value="Upload" style={{ padding: "8px 30px", backgroundColor:"#001cff",color:"white",cursor:"pointer"}} />

                </div>
              </form> */}

                  <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}>


                    <input
                      type="file"
                      name="file"
                      id="upload"
                      onChange={handleFileChange}
                      style={{
                        width: '100%',
                        margin: '10px 0px',
                        padding: '10px',
                        background: '#001cff17',
                      }}
                    />


                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>

                      {
                        status ?
                          <img style={{ width: "40px" }} src="https://invideosearchbucket.s3.us-west-2.amazonaws.com/loader2.gif" />
                          :
                          <button
                            type="submit"
                            style={{
                              padding: '8px 30px',
                              backgroundColor: '#001cff',
                              color: 'white',
                              cursor: 'pointer',
                            }}
                          >
                            Upload
                          </button>
                      }



                    </div>
                  </form>


                </Grid>

              </Grid>
            </ModalContent> :

            <ModalContent sx={{ width: "50vw", height: "auto" }}>
              <div style={{
                width: "100%", textAlign: "center", display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <img style={{ width: "300px" }} src="https://cdn.dribbble.com/users/147386/screenshots/5315437/success-tick-dribbble.gif" />

              </div>

            </ModalContent>

        }


      </Modal>


      <div>



        {
          result.length > 0 ?
            <SearchResult out={result} /> : <p>Search</p>
        }

      </div>
    </Box>
  );
}


const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

const TriggerButton = styled('button')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);