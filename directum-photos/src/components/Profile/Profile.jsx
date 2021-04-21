import React, { useState, useEffect } from 'react';

import Loader from '../Loaders/Loader/Loader';
import SmallLoader from '../Loaders/SmallLoader/SmallLoader';

import Album from '../Album/Album';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { getCurrentUser, getAlbum } from '../../api/openApi';

import './Profile.css';

function Profile({userId}) {
    const [profile, setProfile] = useState({});
    const [albums, setAlbums] = useState([]);
    const [openAlbum, setOpenAlbum] = React.useState(false);

    useEffect(() => {
        getCurrentUser(userId)
            .then((profile) => setProfile(profile))
            .catch(console.error);
    }, [userId])


    const { id, name, username, email, phone, website, address = {}, company = {} } = profile;

    useEffect(() => {
        getAlbum()
            .then((allAlbums) => {
                allAlbums.forEach(album => {
                    if(album.userId === id) {
                        setAlbums(oldAlbums => [...oldAlbums, album]);
                    }
                })
            })
            .catch(console.error);
    }, [id])

    const handleAlbumClickOpen = () => {
        setOpenAlbum(true);
      };
    
      const handleAlbumClose = () => {
        setOpenAlbum(false);
      };

    if (Object.keys(profile).length === 0) return (<div className="profile"><Loader/></div>);

    return (
        <div className="profile">
            <Container maxWidth="lg">
                <div className="profile__block">
                    <h2 className="profile__title">Пользователь: {username}</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={4}>
                            <Typography gutterBottom variant="h6">
                                Профиль
                            </Typography>
                            <List className="profile__list">
                                <ListItem>
                                    <ListItemText
                                        primary={`Имя: ${name}`}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText>
                                        E-mail: <a href={`mailto:` + email}>{email}</a>
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary={`Телефон: ${phone}`}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText>
                                        Ссылка на сайт: <a href={`http://` + website}>{website}</a>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Typography gutterBottom variant="h6">
                                Адресс
                            </Typography>
                            <List className="profile__list">
                                <ListItem>
                                    <ListItemText
                                        primary={`Улица: ${address.street}`}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary={`Номер дома: ${address.suite}`}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary={`Город: ${address.city}`}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary={`Зип-код: ${address.zipcode}`}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Typography gutterBottom variant="h6">
                                Компания
                            </Typography>
                            <List className="profile__list">
                                <ListItem>
                                    <ListItemText
                                        primary={`Компания: ${company.name}`}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary={`Фраза: ${company.catchPhrase}`}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </div>
                <div className="albums-block">
                    <h2 className="albums-block__title">Альбомы</h2>
                    {albums.length === 0 ?
                        <SmallLoader/>
                    :
                        <Grid container spacing={2}>
                            {albums.map(({id, title}) => {
                                return (
                                    <Grid item xs={12} lg={4} key={`album-` + id}>
                                        <Button
                                            onClick={handleAlbumClickOpen}
                                            className="album-btn"
                                            variant="contained"
                                            color="primary"
                                            startIcon={<FolderIcon />}
                                        >
                                            {title}
                                        </Button>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    }
                </div>
            </Container>
            <Album open={openAlbum} handleClose={handleAlbumClose}/>
        </div>
    )
}

export default Profile;