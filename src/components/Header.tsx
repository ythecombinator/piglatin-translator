import React from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: "none",
      display: "flex",
      justifyContent: "center",
      marginBottom: theme.spacing(4),
    },
    headline: {
      textAlign: "center",
      padding: theme.spacing(4),
    },
  })
);

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static">
      <Typography className={classes.headline} variant="h3">
        Pig Latin Translator
      </Typography>
    </AppBar>
  );
}
