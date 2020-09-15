import React, {useEffect, useRef, useState} from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core';
import Button, {ButtonProps} from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';

import {translate} from 'utils/translator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    subContainer: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        alignItems: "normal",
      },
    },
    textField: {
      minWidth: "30vw",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2, 0),
      },
    },
  })
);

export default function Translator() {
  const classes = useStyles();

  // State

  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  // Refs

  const textRef = useRef<HTMLInputElement>();

  // Effects

  useEffect(() => {
    const translation = translate(originalText);
    setTranslatedText(translation);
  }, [originalText]);

  // Event Handlers

  const onTextChange: TextFieldProps["onChange"] = (ev) => {
    setOriginalText(ev.target.value);
  };

  const onTextClear: ButtonProps["onClick"] = (_) => {
    setOriginalText("");
  };

  const onCopyToClipboard: ButtonProps["onClick"] = (_) => {
    textRef.current?.select();
    document.execCommand("copy");
  };

  // Render

  return (
    <Container className={classes.container} maxWidth="sm">
      <Container className={classes.subContainer} maxWidth="sm">
        <TextField
          className={classes.textField}
          label="English 🇬🇧"
          variant="outlined"
          multiline
          rows={10}
          value={originalText}
          onChange={onTextChange}
        />
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={onTextClear}
        >
          Clear
        </Button>
      </Container>

      <Container className={classes.subContainer} maxWidth="sm">
        <TextField
          className={classes.textField}
          label="Pig Latin 🐷"
          variant="outlined"
          multiline
          rows={10}
          value={translatedText}
          inputRef={textRef}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={onCopyToClipboard}
        >
          Copy
        </Button>
      </Container>
    </Container>
  );
}
