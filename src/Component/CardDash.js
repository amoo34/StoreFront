import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Chart from 'react-apexcharts'
const useStyles = makeStyles({
    root: {
        boxShadow: '-1px 4px 20px -8px grey'
    }
  });
function CardDash({detail,title,Img,Color,info}) {
    const classes = useStyles()
    return (
        
        <Card className={classes.root} style={{overflow:'visible'}}>
    
        <CardHeader 
        title={<h6 style={{fontWeight:''}} > {title}</h6>}
                       
        avatar={<Img style={{fontSize:'70px',padding:'10px',marginTop:'-30px',opacity:'1',color:'white',backgroundColor:Color, boxShadow:'-1px 4px 20px -12px black'}} />}
                        />
 
      <CardContent >
      <Typography gutterBottom variant="p" style={{paddingLeft:'3px'}} component="h6">
         <span style={{fontWeight:'bold'}}></span>{detail} {info}
        </Typography>
      </CardContent>
 
    
    </Card>

    )
}

export default CardDash
