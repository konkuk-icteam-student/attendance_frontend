import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Board(props) {
  const { deptMembers } = props;

  const numRows = Math.ceil(deptMembers.length / 2);
  const firstColumnMembers = deptMembers.slice(0, numRows);
  const secondColumnMembers = deptMembers.slice(numRows);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Grid container spacing={2} justifyContent="center">
        {[firstColumnMembers, secondColumnMembers].map(
          (column, columnIndex) => (
            <Grid
              container
              item
              xs={12}
              sm={6}
              key={columnIndex}
              justifyContent={columnIndex === 0 ? "flex-start" : "flex-end"}
            >
              {column.map((member, index) => (
                <Grid
                  item
                  key={member.id}
                  xs={12}
                  textAlign={
                    columnIndex === 0 && index === numRows - 1
                      ? "left"
                      : "center"
                  }
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AccountCircleIcon fontSize="large" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.name}
                      secondary={member.loginId}
                    />
                  </ListItem>
                  {index < numRows - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </Grid>
              ))}
            </Grid>
          )
        )}
      </Grid>
    </List>
  );
}

export default Board;
