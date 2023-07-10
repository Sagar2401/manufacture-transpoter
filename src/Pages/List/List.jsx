/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";

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

import { getCookie } from "../../Assets/cookies";
import { useList } from "../../Hooks/useList";
import { Toast } from "../../Components/Toast";
const ChatList = ({ data, handleAddPrice, setData, getManufacturer }) => {
  const userData = JSON.parse(getCookie("user_data"));
  const scrollRef = useRef();
  const {
    search,
    notification,
    setNotification,
    setSearch,
    setMessages,
    setOrderData,
    handleSendMsg,
    allmessages,
    messages,
  } = useList();
  console.log(allmessages);
  useEffect(() => {
    setData([]);
    getManufacturer();
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef?.current?.scrollHeight;
  }, [allmessages]);
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
              ?.filter((data) => {
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
                  <ListItem
                    className="listItem"
                    onClick={() => setOrderData(item)}
                  >
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
        {allmessages.length > 0 ? (
          <Grid item xs={8}>
            <List className={"messageArea"} ref={scrollRef}>
              {allmessages?.map((item) => {
                const time = new Date(item.time);

                const formattedTime = time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                console.log(item.fromSelf);
                return (
                  <ListItem key={item._id}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align={item?.fromSelf ? "right" : "left"}
                          primary={item.message}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align={item?.fromSelf ? "right" : "left"}
                          secondary={formattedTime}
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    handleSendMsg();
                  }}
                >
                  Send
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "20%",
              alignItems: "center",
              width: "66%",
            }}
            ref={scrollRef}
          >
            No Messages select any order to start chat
          </div>
        )}
      </Grid>
      <Toast notification={notification} setNotification={setNotification} />
    </div>
  );
};

export default ChatList;
