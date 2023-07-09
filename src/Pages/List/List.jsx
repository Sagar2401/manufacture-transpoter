import React, { useState } from "react";

import "./List.css";
import {
  Button,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

import { io } from "socket.io-client";
import { getCookie } from "../../Assets/cookies";
import axios from "axios";
const ChatList = ({ data, handleAddPrice }) => {
  const userData = JSON.parse(getCookie("user_data"));
  const token = getCookie("user_token");

  console.log(userData);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [m, setm] = useState("");
  const [d, setd] = useState({});

  const socket = io(`${process.env.REACT_APP_SERVER}`);
  // socket.on("connect_error", (error) => {});
  socket.on("connect", () => {
    // localStorage.setItem("socket_id", socket.id);
    console.log("connected");
  });

  socket.on(
    "send-msg",
    {
      from: d.transporter,
      to: "64a97bc9f493e8b3d0107edc",
      message: m,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const handleSendMsg = async (msg) => {
    await axios.post(
      "http://localhost:5000/api/message/addmsg",
      {
        from: d.transporter,
        to: "64a97bc9f493e8b3d0107edc",
        message: m,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);
    console.log(msgs);
  };

  return (
    <div>
      <Grid container className={"chatSection"}>
        <Grid item xs={4} className={"borderRight500"}>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Divider />
          <List className="list">
            {data
              .filter((data) => {
                //find the ata for from,to,order id
                if (search === "") {
                  return data;
                } else if (
                  data.from.toLowerCase().includes(search.toLowerCase())
                ) {
                  return data;
                } else if (
                  data.to.toLowerCase().includes(search.toLowerCase())
                ) {
                  return data;
                } else if (
                  data._id.toLowerCase().includes(search.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((item) => {
                return (
                  <ListItem className="listItem" onClick={() => setd(item)}>
                    <div>
                      <div>
                        Order ID : <span>{item._id}</span>
                      </div>
                      <div>
                        From : <span>{item.from}</span>
                      </div>
                      <div>
                        To : <span>{item.to}</span>
                      </div>
                      <div>
                        Price : <span>{item.price}</span>
                      </div>
                    </div>
                    {!userData.isManufacturor && (
                      <Button
                        variant="contained"
                        disabled={item.price}
                        onClick={() => {
                          handleAddPrice(item);
                        }}
                      >
                        Add price
                      </Button>
                    )}{" "}
                  </ListItem>
                );
              })}
          </List>
        </Grid>
        <Grid item xs={8}>
          <List className={"messageArea"}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                onChange={(e) => setm(e.target.value)}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                  handleSendMsg(m);
                }}
              >
                Send
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatList;
