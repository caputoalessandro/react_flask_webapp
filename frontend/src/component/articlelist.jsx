import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import Header from './header.tsx';
import {Link} from 'react-router-dom';

function Articlelist() {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/get")
            .then((response) => response.json())
            .then((response) => setArticles(response));
    }, []);

    return (
        <main>
            <Header/>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {articles.map((article) => (
                        <Grid item key={article} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image="https://source.unsplash.com/random?wallpapers"
                                />

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {article.author}
                                    </Typography>
                                    <Typography>
                                        This is a media card. You can use this section to describe the
                                        content.
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size="small">View</Button>
                                    <Button size="small">Delete</Button>
                                    <Link to="/update" state={{
                                        author: article.author,
                                        title: article.title,
                                        price: article.price,
                                        id: article.id
                                    }}>
                                        <Button size="small"> Update</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    )
}

export default Articlelist;