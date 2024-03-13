import React from 'react';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import APIupdate from "./APIupdate.jsx";

function Update(){
    const state = useLocation()
    const params = state.state
    const FORM_ENDPOINT = "http://localhost:5173/";

    const updateArticle = () => {
        APIupdate.UpdateArticle(params.id)
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
        <form
            action={FORM_ENDPOINT}
            onSubmit={handleSubmit}
            method="POST"
        >
            <h2>Update Book</h2>

            <TextField
                id="filled-multiline-static"
                label="Author"
                multiline
                rows={2}
                defaultValue={params.author}
                variant="filled"
                fullWidth
                sx={{mb: 3}}
            />
            <TextField
                id="filled-multiline-static"
                label="Title"
                multiline
                rows={2}
                defaultValue={params.title}
                variant="filled"
                fullWidth
                sx={{mb: 3}}
            />
            <TextField
                id="filled-multiline-static"
                label="Price"
                multiline
                rows={2}
                defaultValue={params.price}
                variant="filled"
                fullWidth
                sx={{mb: 3}}
            />
            <Stack spacing={2} direction="row">
                <Link to="/">
                    <Button variant="outlined">Cancel</Button>
                </Link>
                <Button variant="contained" onClick={() => updateArticle()}>Save</Button>
            </Stack>
        </form>
        </Container>
    );
}

export default Update;