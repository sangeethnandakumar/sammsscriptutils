import React from 'react'
import UtilCard from "../components/utilcard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function MainPage() {
    return (
        <Container fixed className={"containerSpacing"}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <UtilCard CardName={"Alter Column"} CardDesc={"Generate script for adding new columns to DB table"} Route={"/altercolumn"} />
                </Grid>
                <Grid item xs={4}>
                    <UtilCard CardName={"Dynamic Dropdown"} CardDesc={"Generate script for adding dynamic dropdown values to DB table"} Route={"/dynamicdropdown"}/>
                </Grid>
                <Grid item xs={4}>
                    <UtilCard CardName={"DynamicForm Scripts"} CardDesc={"Generate multiple scripts for dynamic form"} Route={"/dynamicscripts"}/>
                </Grid>
                <Grid item xs={4}>
                    <UtilCard CardName={"Add Signature"} CardDesc={"Generate scripts for adding signature to form"} Route={"/addsignature"}/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default MainPage;
