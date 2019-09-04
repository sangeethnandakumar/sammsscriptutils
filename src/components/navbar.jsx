import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from "react-router-dom/es/Link";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={"/"} exact style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color="inherit">HOME PAGE</Button>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        Script Utils <div className={"dev"}>By Sangeeth Nandakumar</div>
                    </Typography>
                    <Link to={"/"} exact style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color="inherit">HOME PAGE</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}