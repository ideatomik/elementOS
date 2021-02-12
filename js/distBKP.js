//#region DIAGRAM SKELETON 

var grido = document.getElementById("grid");
var sgroup = 5;
var pgroup = 7;
var dgroup = 9;
var fgroup = 11;

// Create cells by column

var i; // i = row number, starting row
var r = 14; // max row

//S column starts with 1s, up to 7s
var me = 0; // initial value -1
for (i = 0; i < r; i++) {
    if (i % 2 != 0)
    {
        me ++;        
        const newcell = document.createElement("div");  
        grido.appendChild(newcell);
        newcell.classList.add('distcell', 'filled', 'sgroup');
        newcell.style.gridRow = i;
        newcell.style.gridColumn = sgroup;
        const lvltext = document.createElement("span");
        lvltext.classList.add('level');
        lvltext.innerHTML = `${me}s`;
        newcell.appendChild(lvltext);
        newcell.id = `${me}s`;           
        // add a neat frame to it
        const frame = document.createElement("div");
        frame.classList.add('frame');
        newcell.appendChild(frame);
    }
  }   

//P column starts with 2p, up to 7p
 
var me = 1; // initial value -1
var f = 2; // initial row -1
for (i = 0; i < r; i++) {
    if (i > f && i % 2 != 0)
    {
        me ++;
        const newcell = document.createElement("div");  
        grido.appendChild(newcell);
        newcell.classList.add('distcell','filled','pgroup'); 
        newcell.style.gridRow = i;
        newcell.style.gridColumn = pgroup;
        const lvltext = document.createElement("span");
        lvltext.classList.add('level');
        lvltext.innerHTML = `${me}p`;
        newcell.appendChild(lvltext);
        newcell.id = `${me}p`;
        // add a neat frame to it
        const frame = document.createElement("div");
        frame.classList.add('frame');
        newcell.appendChild(frame);
    }
  } 

//D column starts with 3d, up to 6d
var me = 2; // initial value -1
var f = 4; // initial row -1
var r = 12; // max row +1
for (i = 0; i < r; i++) {
    if (i > f && i % 2 != 0)
    {
        me ++;
        const newcell = document.createElement("div");  
        grido.appendChild(newcell);
        newcell.classList.add('distcell','filled','dgroup');
        newcell.style.gridRow = i;
        newcell.style.gridColumn = dgroup;
        const lvltext = document.createElement("span");
        lvltext.classList.add('level');
        lvltext.innerHTML = `${me}d`;
        newcell.appendChild(lvltext);
        newcell.id = `${me}d`;
        // add a neat frame to it
        const frame = document.createElement("div");
        frame.classList.add('frame');
        newcell.appendChild(frame);
    }
  } 

//F column starts with 4f, up to 5f
var me = 3; // initial value -1
var f = 6; // initial row -1
var r = 10; // max row +1
for (i = 0; i < r; i++) {
    if (i > f && i % 2 != 0)
    {
        me ++;
        const newcell = document.createElement("div");  
        grido.appendChild(newcell);
        newcell.classList.add('distcell','filled','fgroup'); 
        newcell.classList.add('filled');
        newcell.style.gridRow = i;
        newcell.style.gridColumn = fgroup;
        const lvltext = document.createElement("span");
        lvltext.classList.add('level');
        lvltext.innerHTML = `${me}f`;
        newcell.appendChild(lvltext);
        newcell.id = `${me}f`;
        // add a neat frame to it
        const frame = document.createElement("div");
        frame.classList.add('frame');
        newcell.appendChild(frame);
    }
  } 

//#endregion DIAGRAM SKELETON 


  //////////////////////////////////////////////////////////////////////!///////////////////////
  // "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6" full
  // "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 7p1" laurêncio filho da puta
  // "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 6d1" 89 *DONE*
  // "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 5d1" 57 *DONE*

var ec =  "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6";
var elnumber = 81;

var res = ec.split(" ");

  // get valence shell
  var lastlvl = res[res.length - 1].substring(0,2);
  
  // pass the element to the diagram
  res.forEach(e => {
      const lvl = e.substring(0,2); // the electrons


      const where = document.getElementById(lvl);
      const inwhere = where.innerHTML; //where it goes
      // create span in the level
      const electrons = document.createElement("span");
      electrons.classList.add('electrons');
      electrons.innerHTML = e.substring(2);
      //where.innerHTML = inwhere + e.substring(2);
      where.appendChild(electrons);
  });

  // get the diagram cells filled with
  
  var cells = document.getElementsByClassName('filled');
  var cellsrray = Array.from(cells);
  
// clear empty cells
  var filledcell = [];
  cellsrray.forEach(cell => {
      if (cell.children.length < 3) // if so, it doesn't have electrons 
      {
        cell.innerHTML = "";
        cell.classList.remove('filled');
        //cell.style.display = "none";
      }
      else{
          filledcell.push(cell);
      }      
  });

//#region lines

// name the fams
var sfam = [];
var pfam = [];
var dfam = [];
var ffam = [];

// get the fams
filledcell.forEach(element => {
    if (element.classList.contains('sgroup'))
        sfam.push(element);  
    else if (element.classList.contains('pgroup'))
    pfam.push(element);  
    else if (element.classList.contains('dgroup'))
    dfam.push(element);   
    else if (element.classList.contains('fgroup'))
    ffam.push(element);    
});

//#region sfam

// sfam connectors
for (i = 0; i < sfam.length; i++)
{ 
    if (sfam[i].id != document.getElementById(lastlvl).id)
    {
        const connector = document.createElement("div");  
        grido.appendChild(connector);
        connector.style.gridRow = Number(sfam[i].style.gridRow) + 1;
        connector.style.gridColumn = Number(sfam[i].style.gridColumn);
        connector.classList.add('connectup');
    }
    
    
}
// sfam up lines
for (i = 1; i < sfam.length; i++)
{    
    if (sfam[i].id != document.getElementById(lastlvl).id)
    {
        const upline = document.createElement("div");  
        grido.appendChild(upline);
        upline.style.gridRow = Number(sfam[i].style.gridRow);
        upline.style.gridColumn = Number(sfam[i].style.gridColumn) + 1;
        upline.classList.add('linedotted', 'shelline');
    }
    
}

// sfam hat 
if (sfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(sfam[0].style.gridRow);
    hat.style.gridColumn = Number(sfam[0].style.gridColumn) + 1;
    hat.classList.add('curvedown');
}

// sfam top S 
if (sfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(sfam[0].style.gridRow) + 1;
    hat.style.gridColumn = Number(sfam[0].style.gridColumn) + 1;
    hat.classList.add('connectdown');
}

// sfam entry arrow
if (sfam.length > 1)
{
    for (i = 2; i < sfam.length; i++)
    {   //the line
        const line = document.createElement("div");
        grido.appendChild(line);
        line.style.gridRow = Number(sfam[i].style.gridRow) - 1;
        line.style.gridColumn = Number(sfam[i].style.gridColumn) + 1;
        line.classList.add('line');        
    }
}

//#endregion sfam

//#region pfam
var px;

if (pfam.length != 0)
{
    if (pfam[pfam.length - 1].id === lastlvl)
        px = 1;
    else if (Number(document.getElementById(lastlvl).style.gridColumn) === sgroup)
        {
            px = 1;
        }
    else
        px = 0;
}

// pfam connectors
for (i = 0; i < pfam.length - px; i++)
{    
    const connector = document.createElement("div");  
    grido.appendChild(connector);
    connector.style.gridRow = Number(pfam[i].style.gridRow) + 1;
    connector.style.gridColumn = Number(pfam[i].style.gridColumn);
    connector.classList.add('linedotted');
}
// pfam up lines
for (i = 1; i < pfam.length - px; i++)
{    
    const upline = document.createElement("div");  
    grido.appendChild(upline);
    upline.style.gridRow = Number(pfam[i].style.gridRow);
    upline.style.gridColumn = Number(pfam[i].style.gridColumn) + 1;
    upline.classList.add('linedotted','shelline');
}

// pfam hat 
if (pfam.length > 0)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(pfam[0].style.gridRow)-1;
    hat.style.gridColumn = Number(pfam[0].style.gridColumn);
    hat.classList.add('curvedown');
}

// pfam secondary hat 
if (pfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(pfam[1].style.gridRow)-2;
    hat.style.gridColumn = Number(pfam[1].style.gridColumn) + 1;
    hat.classList.add('curvedown');
}

/*
// pfam top S 
if (pfam.length > 0)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(pfam[0].style.gridRow);
    hat.style.gridColumn = Number(pfam[0].style.gridColumn);
    hat.style.zIndex = 0;
    hat.classList.add('connectdown');
}*/

// pfam secondary S 
if (pfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(pfam[1].style.gridRow) - 1;
    hat.style.gridColumn = Number(pfam[1].style.gridColumn) + 1;
    hat.classList.add('connectdown');
}

// pfam entry arrow
if (pfam.length > 1)
{
    for (i = 2; i < pfam.length; i++)
    {   //the line
        const line = document.createElement("div");
        grido.appendChild(line);
        line.style.gridRow = Number(pfam[i].style.gridRow) - 1;
        line.style.gridColumn = Number(pfam[i].style.gridColumn) + 1;
        line.classList.add('line');
    }
}

//#endregion pfam

//#region dfam

var dx;

if (dfam.length != 0)
{
    //if (dfam[dfam.length - 1].style.gridRow < document.getElementById(lastlvl).style.gridRow)
    if (Number(document.getElementById(lastlvl).style.gridColumn) === sgroup || Number(document.getElementById(lastlvl).style.gridColumn) === pgroup)
        dx = 1;
    else if (dfam[dfam.length - 1].id === lastlvl)
        dx = 1;
    else
        dx = 0;
}



// dfam connectors
for (i = 0; i < dfam.length - dx; i++)
{    
    const connector = document.createElement("div");  
    grido.appendChild(connector);
    connector.style.gridRow = Number(dfam[i].style.gridRow) + 1;
    connector.style.gridColumn = Number(dfam[i].style.gridColumn);
    connector.classList.add('linedotted');
}
// dfam up lines
for (i = 1; i < dfam.length - dx; i++)
{    
    const upline = document.createElement("div");  
    grido.appendChild(upline);
    upline.style.gridRow = Number(dfam[i].style.gridRow);
    upline.style.gridColumn = Number(dfam[i].style.gridColumn) + 1;
    upline.classList.add('linedotted', 'shelline');
}

// dfam hat 
if (dfam.length > 0)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(dfam[0].style.gridRow)-1;
    hat.style.gridColumn = Number(dfam[0].style.gridColumn);
    hat.classList.add('curvedown');
}

// dfam secondary hat 
if (dfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(dfam[1].style.gridRow)-2;
    hat.style.gridColumn = Number(dfam[1].style.gridColumn) + 1;
    hat.classList.add('curvedown');
}
/*
// dfam top S 
if (dfam.length > 0)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(dfam[0].style.gridRow);
    hat.style.gridColumn = Number(dfam[0].style.gridColumn);
    hat.style.zIndex = 0;
    hat.classList.add('connectdown');
}*/

// dfam secondary S 
if (dfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(dfam[1].style.gridRow) - 1;
    hat.style.gridColumn = Number(dfam[1].style.gridColumn) + 1;
    hat.classList.add('connectdown');
}

// dfam entry arrow
if (dfam.length > 1)
{
    for (i = 2; i < dfam.length; i++)
    {   //the line
        const line = document.createElement("div");
        grido.appendChild(line);
        line.style.gridRow = Number(dfam[i].style.gridRow) - 1;
        line.style.gridColumn = Number(dfam[i].style.gridColumn) + 1;
        line.classList.add('line');
    }
}

//#endregion dfam

//#region ffam

var fx;
if (ffam.length != 0)
{
    if (ffam[ffam.length - 1].style.gridRow != document.getElementById(lastlvl).style.gridRow)
    fx = 1;
else if (ffam[ffam.length - 1].id === lastlvl)
    fx = 1;
else
    fx = 0;
}



// ffam connectors
for (i = 0; i < ffam.length - fx; i++)
{    
    const connector = document.createElement("div");  
    grido.appendChild(connector);
    connector.style.gridRow = Number(ffam[i].style.gridRow) + 1;
    connector.style.gridColumn = Number(ffam[i].style.gridColumn);
    connector.classList.add('linedotted');
}
// ffam up lines
for (i = 1; i < ffam.length - fx; i++)
{    
    const upline = document.createElement("div");  
    grido.appendChild(upline);
    upline.style.gridRow = Number(ffam[i].style.gridRow);
    upline.style.gridColumn = Number(ffam[i].style.gridColumn) + 1;
    upline.classList.add('linedotted', 'shelline');
}

// ffam hat 
if (ffam.length > 0)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(ffam[0].style.gridRow)-1;
    hat.style.gridColumn = Number(ffam[0].style.gridColumn);
    hat.classList.add('curvedown');
}

// ffam secondary hat 
if (ffam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(ffam[1].style.gridRow)-2;
    hat.style.gridColumn = Number(ffam[1].style.gridColumn) + 1;
    hat.classList.add('curvedown');
}
/*
// ffam top S 
if (ffam.length > 0)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(ffam[0].style.gridRow);
    hat.style.gridColumn = Number(ffam[0].style.gridColumn);
    hat.style.zIndex = 0;
    hat.classList.add('connectdown');
}*/

// ffam secondary S 
if (ffam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(ffam[1].style.gridRow) - 1;
    hat.style.gridColumn = Number(ffam[1].style.gridColumn) + 1;
    hat.classList.add('connectdown');
}

// ffam entry arrow
if (ffam.length > 1)
{
    for (i = 2; i < ffam.length; i++)
    {   //the line
        const line = document.createElement("div");
        grido.appendChild(line);
        line.style.gridRow = Number(ffam[i].style.gridRow) - 1;
        line.style.gridColumn = Number(ffam[i].style.gridColumn) + 1;
        line.classList.add('line');
    }
}

//#endregion ffam

//#region exceptions

if (elnumber == 57)
{
    const elbow = document.getElementById('4f');
    elbow.classList.add('connectdown')
    //elbow.style.marginBottom = "2px";
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(elbow.style.gridRow)-1;
    hat.style.gridColumn = Number(elbow.style.gridColumn);
    hat.classList.add('curvedown');

    const danger = document.getElementsByClassName('linedotted');
    dangerArray = Array.from(danger);
    dangerArray.forEach(element => {
        if(element.style.gridRow == 7 && element.style.gridColumn == 9)
            element.style.backgroundColor = "transparent";
    });
}


if (elnumber == 89 || elnumber == 90)
{
    const elbow = document.getElementById('5f');
    elbow.classList.add('connectdown')
    //elbow.style.marginBottom = "2px";
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(elbow.style.gridRow)-1;
    hat.style.gridColumn = Number(elbow.style.gridColumn);
    hat.classList.add('curvedown');

    const danger = document.getElementsByClassName('linedotted');
    dangerArray = Array.from(danger);
    dangerArray.forEach(element => {
        if(element.style.gridRow == 9 && element.style.gridColumn == 9)
            element.style.backgroundColor = "transparent";
    });
}

if (elnumber == 103)
{
    const elbow = document.getElementById('6d');
    elbow.classList.add('lineclean')
    //elbow.style.marginBottom = "2px";
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(elbow.style.gridRow)-1;
    hat.style.gridColumn = Number(elbow.style.gridColumn);
    hat.classList.add('linedotted');
    const hatfeather = document.createElement("div");
    grido.appendChild(hatfeather);
    hatfeather.style.gridRow = Number(elbow.style.gridRow)-2;
    hatfeather.style.gridColumn = Number(elbow.style.gridColumn)+1;
    hatfeather.classList.add('linedotted', 'shelline');
    const right = document.createElement("div");
    grido.appendChild(right);
    right.style.gridRow = Number(elbow.style.gridRow)-1;
    right.style.gridColumn = Number(elbow.style.gridColumn) + 1;
    right.classList.add('line');

    const danger = document.getElementsByClassName('linedotted');
    dangerArray = Array.from(danger);
    dangerArray.forEach(element => {
        if(element.style.gridRow == 11 && element.style.gridColumn == 7)
            element.style.backgroundColor = "transparent";
    });
}



//#endregion exceptions


//#endregion lines



// first row spacers
/*
for (i = 0; i < 14; i++) {
    const newcell = document.createElement("div");  
    grido.appendChild(newcell);
    newcell.classList.add('firstrow'); 
    newcell.style.gridColumn = i;
    newcell.style.gridRow = 1;
}*/

//#region shell names and their electrons count
var shellnames = ["K","L","M","N","O","P","Q"];
var shellrow = -1;
shellnames.forEach(letter => {    
    shellrow += 2;
    // create the shell letter div
    const newletter = document.createElement("div");  
    grido.appendChild(newletter);
    newletter.classList.add('distcell', 'shellscolumn'); 
    newletter.style.gridRow = shellrow;
    const lvltext = document.createElement("span");
    lvltext.classList.add('shell');
    lvltext.innerHTML = letter;
    newletter.appendChild(lvltext);
    newletter.id = letter;
    
    // get the number of eletrons on that shell and sum it up
    const thislvls = [];
    filledcell.forEach(lvl => {
        if (lvl.style.gridRow == newletter.style.gridRow)
            {                
                
                    const thiseletrons = lvl.getElementsByClassName('electrons')[0].innerHTML;
                    thislvls.push(Number(thiseletrons));
                
                
            }
    
    // sum all the eletrons
    newletter.dataset.value = thislvls.reduce((a, b) => a + b, 0);
    
    });

    // create a div to display that
    if (newletter.dataset.value != 0)
    {
        const eletrohome = document.createElement("div");  
        grido.appendChild(eletrohome);
        eletrohome.classList.add('distcell', 'countcolumn'); 
        eletrohome.style.gridRow = shellrow;        
        const eltext = document.createElement("span");
        eltext.classList.add('shellcount');
        eletrohome.appendChild(eltext);
        eltext.innerHTML = newletter.dataset.value;
        eletrohome.id = letter+"-shell";

        const levelconnection = document.createElement("div");  
        grido.appendChild(levelconnection);
        levelconnection.classList.add('distcell', 'countcolumn'); 
        levelconnection.style.gridRow = shellrow; 

        const levelconnection2 = document.createElement("div");  
        grido.appendChild(levelconnection2);
        levelconnection2.classList.add('distcell', 'countcolumn'); 
        levelconnection2.style.gridRow = shellrow;
    }

        
    if (newletter.dataset.value == 0)
    {
        newletter.style.display = "none";
    }

}); 
//#endregion 

//#region Levels' Starts and End

// get last row
var filledcellrow = [];
filledcell.forEach(cell => {
    var i = cell.style.gridRow;
    filledcellrow.push(Number(i));
});
var lastrow = Math.max.apply(Math,filledcellrow);

// first column curves 
if (sfam[sfam.length - 1].id != document.getElementById(lastlvl).id)
    x = lastrow;
else
    x = lastrow - 1;
for (i = 1; i < x + 1; i+=2) {
        const newcell = document.createElement("div");  
        grido.appendChild(newcell);
        newcell.style.gridColumn = sgroup - 1;
        newcell.classList.add('emptycell'); 
        //if (i % 2 != 0)
        //{ 
            newcell.style.gridRow = i + 1;
            newcell.classList.add('curveup');    
        //}

  }  

// End arrow positioning
const lastcell = document.getElementById(lastlvl);
const xpos = Number(lastcell.style.gridRow) + 1;
const ypos = Number(lastcell.style.gridColumn) - 1;

const lastarrow = document.getElementById('last');
lastarrow.style.gridRow = xpos;
lastarrow.style.gridColumn = ypos;




// last row spacers
for (i = 0; i < 14; i++) {
    const newcell = document.createElement("div");  
    grido.appendChild(newcell);
    newcell.classList.add('lastrow'); 
    newcell.style.gridColumn = i;
    newcell.style.gridRow = lastrow + 3;
}

//#endregion Levels' Starts and End
