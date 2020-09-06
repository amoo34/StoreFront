import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Chart from 'react-apexcharts'
const useStyles = makeStyles({
    root: {

    },
    media: {
        width: 151,
      
        marginTop:'10px',
        margin:'auto',
        borderRadius:'80px',
        border:'5px solid #688ACE'
        },
  });
function CardGraph({Graphoptions,Graphseries,Graphtype,BackgroundColor,title}) {
    const classes = useStyles()
    return (
        
             
             <Card className={classes.root} style={{overflow:'visible'}}>
            <CardMedia/>
             <Chart options={Graphoptions} series={Graphseries} type={Graphtype} style={{backgroundColor:BackgroundColor,padding:'10px',margin:'15px',marginTop:'0px'}} />
            
  <CardContent >
  <Typography gutterBottom variant="p" style={{paddingLeft:'3px',color:'grey',fontSize:'18px'}} component="h6">
     {title}
    </Typography> 
  </CardContent>


</Card>
        
    )
}

export default CardGraph
