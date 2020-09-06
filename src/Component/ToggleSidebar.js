import React from 'react'
import SubdirectoryArrowLeftSharpIcon from '@material-ui/icons/SubdirectoryArrowLeftSharp';
import SubdirectoryArrowRightSharpIcon from '@material-ui/icons/SubdirectoryArrowRightSharp';
function ToggleSidebar({classIs}) {
    const showSidebar=()=>{
      
        document.querySelector('.Mob_Sidebar').style.display ='block';
        document.querySelector('.hide').style.display ='block';
        document.querySelector('.show').style.display ='none';
     
    }
    const closeSidebar=()=>{
       
        document.querySelector('.Mob_Sidebar').style.display ='none';
        document.querySelector('.show').style.display ='block';
        document.querySelector('.hide').style.display ='none';

    }
    return (
        <div >
              <button className="show" onClick={showSidebar} ><SubdirectoryArrowRightSharpIcon/></button>
        <button  className="hide" onClick={closeSidebar} ><SubdirectoryArrowLeftSharpIcon/></button>
        
        </div>
    )
}

export default ToggleSidebar
