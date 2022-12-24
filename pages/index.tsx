import React, { useState } from "react";
import { Alert, Box, Container, FormGroup, FormControlLabel, Switch } from "@mui/material";

const apiServerUrl = process.env.NEXT_PUBLIC_MUTE_SERVER_API_URL;

export default function Home({ data }) {

  const [isMute, setMute] = useState(JSON.parse(data.mute));
  const [alertMsg, setAlertMsg] = useState("mute is " + data.mute);

  const handleSwitchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      fetch(apiServerUrl + "/mute")
        .then((res) => res.json())
        .then((data) => {
          setMute(JSON.parse(data.mute));
          setAlertMsg("set mute to " + data.mute);
        })
        .catch((err) => {
          setAlertMsg(err.message);
        });
    } else {
      fetch(apiServerUrl + "/unmute")
        .then((res) => res.json())
        .then((data) => {
          setMute(JSON.parse(data.mute));
          setAlertMsg("set mute to " + data.mute);
        })
        .catch((err) => {
          setAlertMsg(err.message);
        });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={isMute} onChange={handleSwitchChange} />}
            label="Mute"
          />
        </FormGroup>
        <Alert
          style={{ width: "100%" }}
          sx={{
            marginTop: 3,
          }}
          severity="info">
          {alertMsg}
        </Alert>
      </Box>
    </Container>
  );
}

export async function getServerSideProps() {

  const res = await fetch(apiServerUrl)
  const data = await res.json()

  return { props: { data } }
}