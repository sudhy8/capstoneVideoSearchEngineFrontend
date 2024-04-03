import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import { useState, useRef } from 'react';

import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
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

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme?.transitions?.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ReviewCard(data) {

    const [currentTime, setCurrentTime] = useState(0);
    const playerRef = useRef(null);

    const handleJumpToTime = (time) => {
        setCurrentTime(time);
        playerRef.current.seekTo(time, 'seconds');
    };


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [expanded, setExpanded] = React.useState(false);
    console.log(data?.data)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    function convertTimeToSeconds(timeString) {
        const [hours, minutes, seconds] = timeString.split(':');
        const secondsWithMilliseconds = seconds.split('.');
        const secondsValue = parseFloat(`${secondsWithMilliseconds[0]}.${secondsWithMilliseconds[1]}`);

        return (
            parseFloat(hours) * 3600 +
            parseFloat(minutes) * 60 +
            secondsValue
        );
    }

    return (
        <>

            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent sx={{ width: "90vw", height: "80vh" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <p style={{padding:"10px 10px 10px 0px",fontSize:"20px"}}>
                                {data?.data?.scenes[0]?.video_name}
                            </p>
                        </Grid>
                        <Grid item xs={9}>
                            {/* <video width="100%" controls>
                                <source src={`https://invideosearchbucket.s3.us-west-2.amazonaws.com/${data?.data?.video_path}`} type="video/mp4" />
                            </video> */}

                            <ReactPlayer
                                url={`https://invideosearchbucket.s3.us-west-2.amazonaws.com/${data?.data?.video_path}`}
                                width="100%"
                                height="calc(100% - 100px)"
                                controls
                                ref={playerRef}
                                onProgress={(progress) => setCurrentTime(progress.playedSeconds)}

                            />
                        </Grid>
                        <Grid item xs={3} style={{
                            padding: "0px 15px", height: "calc(80vh - 100px)",
                            overflow: "auto", background:"#e8f4ff"
                        }}>
                            {
                                data?.data?.scenes?.map(scn => (

                                    <Grid container style={{ padding: "5px", background:'#bde0ff',padding:"10px 10px",margin:'10px 0px' }}>
                                        <Grid item xs={12} container>
                                            <Grid item xs={12}>
                                                <img onClick={() => handleJumpToTime(convertTimeToSeconds(scn?.start_time))} style={{  }} src={`https://invideosearchbucket.s3.us-west-2.amazonaws.com/${scn?.frame_file}`} />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <p>Scene: 
                                                    {
                                                        scn?.scene_number
                                                    }
                                                </p> 
                                            </Grid>
                                            <Grid item xs={12}>
                                                <p>
                                                    From - To
                                                </p>

                                            </Grid>
                                            <Grid item xs={12}>
                                                <p>
                                                    {
                                                        scn?.start_time.slice(0, -4)
                                                    } - ‎    
                                                    {
                                                        scn?.end_time.slice(0, -4)
                                                    }
                                                </p>
                                                
                                            </Grid>
                                            

                                        </Grid>

                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </ModalContent>
            </Modal>


            <Card style={{ padding: "15px", height: "100%",position:"relative" }}>

                <video width="100%" controls style={{ borderRadius: '5px' }}>
                    <source src={`https://invideosearchbucket.s3.us-west-2.amazonaws.com/${data?.data?.video_path}`} type="video/mp4" />
                </video>
                <CardContent style={{padding:"16px 16px 5px 16px"}}>
                    <p style={{
                        padding: "10px 0px 5px 0px", whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }} variant="body2" color="text.secondary">
                        {data?.data?.scenes[0]?.video_name}

                    </p>
                    <hr />
                    <p style={{paddingTop:"10px"}}>
                        Scens : {data?.data?.scenes?.length}
                    </p>
                </CardContent>
                <CardActions disableSpacing style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "12px"
                }}>
                    {/* <IconButton aria-label="share" onClick={handleOpen}>
                        <ViewSidebarRoundedIcon />
                    </IconButton> */}


                    {/* <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                    </ExpandMore> */}

                    <ExpandMore
                        expand={expanded}
                        onClick={handleOpen}
                        aria-expanded={expanded}
                        aria-label="show more"
                        style={{padding:"0px"}}
                       
                    >
                        <ViewSidebarRoundedIcon />

                    </ExpandMore>


                </CardActions>
                {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    {
                        data?.data?.scenes?.map(scn => (
                            <Grid container>
                                
                                <img style={{width:"150px"}} src={`https://invideosearchbucket.s3.us-west-2.amazonaws.com/${scn?.frame_file}`} />
                            </Grid>
                        ))
                    }
                        <p >
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </p>
                    
                </CardContent>
            </Collapse> */}
            </Card>
        </>
    );
}

