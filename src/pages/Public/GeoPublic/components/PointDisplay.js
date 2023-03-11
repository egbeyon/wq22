import React, { useState } from 'react';
import {Typography, Paper } from '@material-ui/core';
import useStyles from '../styles';
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import * as Waters from '../../../../data/nga_waters.geojson'
import 'mapbox-gl/dist/mapbox-gl.css';

const EntryFilter = ({point, id}) => {
    let strokeColor = "rgb(146, 120, 226)";
    let fillColor = "none";
    let marker = (
        <circle
          cx="12"
          cy="10"
          r="8"
            style={{ fill: fillColor, stroke: strokeColor, strokeWidth: 2 }}
        ></circle> )

      if (point[`${id}`] === 'very high') {
        marker = (
          <circle
            cx="12"
            cy="10"
            r="8"
            style={{ fill: "red", stroke: "grey", strokeWidth: 2 }}
        ></circle>
        );
      }
      else if (point[`${id}`] === 'high') {
        marker = (
          <circle
            cx="12"
            cy="10"
            r="8"
            style={{ fill: "yellow", stroke: "grey", strokeWidth: 2 }}
        ></circle>
        );
      }
      else if (point[`${id}`] === 'fair') {
        marker = (
          <circle
            cx="12"
            cy="10"
            r="8"
            style={{ fill: "green", stroke: "grey", strokeWidth: 2 }}
        ></circle>
        );
      }
      else if (point[`${id}`] === 'fair') {
        marker = (
          <circle
            cx="12"
            cy="10"
            r="8"
            style={{ fill: "green", stroke: "grey", strokeWidth: 2 }}
        ></circle>
        );
      }
       return marker;  
  };
  

export default function PointDisplay(props) {
    const classes = useStyles();

    const [viewport, setViewport] = useState({
        latitude: 8.993,
        longitude: 7.448,
        width: "78vw",
        height: "90vh",
        zoom: 5.5
    });
    const [selectedPoint, setSelectedPoint] = useState(null);
    const layerStyle = {
      id: 'line',
      type: 'line',
      paint: {
        //'line-radius': 1,
        'line-color': '#ADD8E6'
      }
    }

    return (
            <Paper className={classes.root}>
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken="pk.eyJ1Ijoic2VnYmV5b24iLCJhIjoiY2w3MHlxNTVxMGl0eDNwczl1cHR6OTFvdyJ9.RGQb01g7ZeAwPfFKvc_7zw"
                    onViewportChange={viewport => {
                    setViewport(viewport);
                    }}
                >
                  <Source id="my-data" type="geojson" data={Waters}>
                    <Layer {...layerStyle} />
                  </Source>
                    {props.entry.map(point => (
                    <Marker
                        key={point._id}
                        latitude={point.latitude}
                        longitude={point.longitude}
                    >
                        <svg 
                            style={{
                            height: `${6 * viewport.zoom}px`,
                            width: `${6 * viewport.zoom}px`,
                            }}
                            onClick={e => {
                                e.preventDefault();
                                setSelectedPoint(point);
                              }}
                            >
                            <EntryFilter point={point} id={props.entryParam} />
                        </svg>
                        
                    </Marker>
                    ))}
                    {selectedPoint ? (
                    <Popup
                        latitude={selectedPoint.latitude}
                        longitude={selectedPoint.longitude}
                        onClose={() => {
                        setSelectedPoint(null);
                        }}
                    >
                            <Typography>STATE: {selectedPoint.temperature}</Typography>
                            <Typography>HYDROLOGICAL AREA: {selectedPoint.pH}</Typography>
                            <Typography>SAMPLING POINT: {selectedPoint.location}</Typography>
                            <Typography>COMMUNITY: {selectedPoint.microbe}</Typography>
                            <Typography>STATUS: {selectedPoint.chlorine}</Typography>
                    
                    </Popup>
                    ) : null} 
                </ReactMapGL>
            </Paper>
    )
}