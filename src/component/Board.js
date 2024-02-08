import React, { useEffect, useMemo, useState, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function Board() {
  const workingMembers = [
    { name: "김호준", id: "1" },
    { name: "김나경", id: "2" },
    { name: "박준형", id: "3" },
    { name: "지민영", id: "4" },
    { name: "문지영", id: "5" },
  ];

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <div className="row justify-content-center">
        {workingMembers.map((member) => {
          return (
            <div key={member.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <AccountCircleIcon fontSize="large" />
                </ListItemAvatar>
                <ListItemText
                  primary={member.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        개발팀
                      </Typography>
                      <br />
                      {" 개인 상태 메시지 ---"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          );
        })}
      </div>
    </List>
  );
}
export default Board;
