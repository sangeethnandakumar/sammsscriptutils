import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Typography} from "@material-ui/core";
import Link from "react-router-dom/es/Link";

class UtilCard extends Component {

    printRoute = () => {
        window.location.href = this.props.Route;
    };

    render() {
        return(
            <Link to={this.props.Route} style={{  textDecoration: 'none'}}>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.CardName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.CardDesc}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        );
    }
}

export default UtilCard;