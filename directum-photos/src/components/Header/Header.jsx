import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './Header.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
}));

function Header({isOpenedProfile, setIsOpenedProfile}) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <AppBar className="header" position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        PhotoGallery
                    </Typography>
                    {isOpenedProfile ? <Button color="inherit" onClick={() => setIsOpenedProfile(!isOpenedProfile)}>Назад</Button> : null}
                </Toolbar>
            </AppBar>
        </div>
    );    
}

export default Header;