import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Poppins } from 'next/font/google';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useState } from 'react';
import ReviewCard from  "./cardLayout"


const out = [
    {
        "start_time": "00:01:28.833",
        "video_path": "___1711824194.292274___goat.mp4",
        "scene_number": 35.0,
        "end_time": "00:01:33.167",
        "random_frame": 2179.0,
        "frame_file": "___1711824194.292274___goat.mp4frame_35.jpg",
        "video_name": "goat.mp4"
    },
    {
        "start_time": "00:01:14.625",
        "video_path": "___1711824194.292274___goat.mp4",
        "scene_number": 32.0,
        "end_time": "00:01:17.333",
        "random_frame": 1825.0,
        "video_name": "goat.mp4",
        "frame_file": "___1711824194.292274___goat.mp4frame_32.jpg"
    },
    {
        "start_time": "00:00:17.080",
        "video_path": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4",
        "scene_number": 4.0,
        "end_time": "00:00:20.360",
        "random_frame": 434.0,
        "frame_file": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4frame_4.jpg",
        "video_name": "The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4"
    },
    {
        "start_time": "00:00:24.680",
        "video_path": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4",
        "scene_number": 6.0,
        "end_time": "00:00:28.800",
        "random_frame": 710.0,
        "frame_file": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4frame_6.jpg",
        "video_name": "The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4"
    },
    {
        "start_time": "00:02:38.480",
        "video_path": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4",
        "scene_number": 23.0,
        "end_time": "00:02:45.360",
        "random_frame": 4102.0,
        "frame_file": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4frame_23.jpg",
        "video_name": "The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4"
    },
    {
        "start_time": "00:02:14.720",
        "video_path": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4",
        "scene_number": 20.0,
        "end_time": "00:02:28.600",
        "random_frame": 3399.0,
        "frame_file": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4frame_20.jpg",
        "video_name": "The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4"
    },
    {
        "start_time": "00:02:28.600",
        "video_path": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4",
        "scene_number": 21.0,
        "end_time": "00:02:34.720",
        "random_frame": 3802.0,
        "frame_file": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4frame_21.jpg",
        "video_name": "The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4"
    },
    {
        "start_time": "00:03:05.920",
        "video_path": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4",
        "scene_number": 28.0,
        "end_time": "00:03:09.760",
        "random_frame": 4654.0,
        "frame_file": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4frame_28.jpg",
        "video_name": "The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4"
    },
    {
        "start_time": "00:02:34.720",
        "video_path": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4",
        "scene_number": 22.0,
        "end_time": "00:02:38.480",
        "random_frame": 3868.0,
        "frame_file": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4frame_22.jpg",
        "video_name": "The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4"
    },
    {
        "start_time": "00:02:45.360",
        "video_path": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4",
        "scene_number": 24.0,
        "end_time": "00:02:53.120",
        "random_frame": 4134.0,
        "frame_file": "___1711830122.9086125___The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4frame_24.jpg",
        "video_name": "The incredible ibex defies gravity and climbs a dam _ Forces of Nature with Brian Cox - BBC.mp4"
    }
]


export default function searchResult() {

const [groupedData, setgroupedData] = useState([])
useEffect(() => {
    setgroupedData(groupper(out))
    console.log("groupedData", groupedData)
}, [])

    const groupper = (data) => {
        // Group the data by video_path
        const groupedData = data.reduce((acc, curr) => {
            const { video_path } = curr;
            if (!acc[video_path]) {
                acc[video_path] = [];
            }
            acc[video_path].push(curr);
            return acc;
        }, {});

        // Convert the grouped data to an array of objects
        const groupedArray = Object.entries(groupedData).map(([key, value]) => ({
            video_path: key,
            scenes: value,
        }));

        return groupedArray;
    }

   



    return (
      <Grid container style={{padding:'15px'}}>
            
      <Grid container spacing={2}>
          {groupedData?.map((video) => (
              <Grid item key={video?.video_path} xs={3} sm={3}>
                  <ReviewCard data={video} />
                  
              </Grid>
          ))}
            </Grid>
        </Grid>

  )
}

