
var grido = document.getElementById('grid');
var survivors = Array.from(document.getElementsByClassName('survivor'));
var namebox = document.getElementById('namebox');
var numatombox = document.getElementById('numberboxnumber');

var sgroup = 5;
var sgroupR = sgroup + 1;
var curvegroup = sgroup - 1;
var pgroup = 7;
var dgroup = 9;
var fgroup = 11;
var done = false;

function PopulateDiagram(configuration, atomnumber, name)
{
if (done == false){
    done = true;

numatombox.innerHTML = atomnumber;
namebox.innerHTML = name;

//#region DIAGRAM SKELETON 

// Create cells by column

var i; // i = row number, starting row
var r = 17; // max row

//S column starts with 1s, up to 7s
var me = 0; // initial value -1
for (i = 3; i < r; i++) {
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
var f = 3; // initial row -1
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
var f = 6; // initial row -1
var r = 15; // max row +1
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
var f = 7; // initial row -1
var r = 13; // max row +1
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

var ec = configuration;
var elnumber = atomnumber;

var res = ec.split(" ");

  // get valence shell
  var lastlvl = res[res.length - 1].substring(0,2);
  var lastolevel = document.getElementById(lastlvl);
  
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

//sx 
var sx;

if (atomnumber >= 89 && atomnumber <= 102 || atomnumber >= 104 && atomnumber <= 112)
    sx = sfam.length +1;
else
    sx = sfam.length;


// sfam header
var sheader = document.getElementById('sheader');
sheader.style.gridColumn = sgroup;

// sfam connectors
for (i = 0; i < sfam.length; i++)
{ 
    if (sfam[i].id != document.getElementById(lastlvl).id)
    {
        const connector = document.createElement("div");  
        grido.appendChild(connector);
        connector.style.gridColumn = sgroup;
        connector.style.gridArea = "sfam[i].style.gridRow + 1 / sgroup / 1 / auto";
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
        const newLocal = "/auto/auto";
        var row = window.getComputedStyle(sfam[i],null).getPropertyValue("grid-row-start");
        upline.style.gridArea =  row + "/" + sgroupR + newLocal;
        upline.id = i+"S-upline";
        upline.classList.add('linedotted', 'shelline');        
    }
}

// sfam hat 
if (sfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = window.getComputedStyle(sfam[0],null).getPropertyValue("grid-row-start");
    hat.style.gridColumn = Number(window.getComputedStyle(sfam[0],null).getPropertyValue("grid-column-start")) + 1;
    hat.classList.add('curvedown');
}

// sfam top S 
if (sfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(sfam[0],null).getPropertyValue("grid-row-start")) + 1;
    hat.style.gridColumn = Number(window.getComputedStyle(sfam[0],null).getPropertyValue("grid-column-start")) + 1;
    hat.classList.add('connectdown');
}

// sfam entry arrow
if (sfam.length > 1)
{
    for (i = 2; i < sfam.length; i++)
    {   //the line
        const line = document.createElement("div");
        grido.appendChild(line);
        line.style.gridRow = Number(window.getComputedStyle(sfam[i],null).getPropertyValue("grid-row-start")) - 1;
        line.style.gridColumn = Number(window.getComputedStyle(sfam[i],null).getPropertyValue("grid-column-start")) + 1;
        line.classList.add('line');        
    }
}


/*if (sfam.length == 7)
    {
        if (atomnumber >= 89  && atomnumber <= 102 || atomnumber >= 104  && atomnumber <= 112)
        {
            const connector = document.createElement("div");  
            grido.appendChild(connector);
            connector.style.gridColumn = sgroup;
            connector.style.gridRow = Number(window.getComputedStyle(sfam[6],null).getPropertyValue("grid-row-start")) + 1;
            connector.classList.add('connectup'); 
            connector.id = "7s-connectup";
        }
    }*/

//#endregion sfam

//#region pfam
var px;

if (pfam.length != 0)
{
    if (pfam[pfam.length - 1].id === lastlvl)
        px = 1;
    else if (Number(window.getComputedStyle(lastolevel,null).getPropertyValue("grid-column-start")) === sgroup)
        {
            px = 1;
        }
    else
        px = 0;

    // header 
    const pheader = document.createElement("div");
    grido.appendChild(pheader);
    pheader.classList.add('header');
    pheader.id = "pheader";
    const bloc = document.createElement("div");
    pheader.appendChild(bloc);
    const mnemonic = document.createElement("span");
    mnemonic.classList.add('mnemonic');
    mnemonic.innerHTML = "pa";
    bloc.appendChild(mnemonic);
    const bloctitle = document.createElement("span");
    bloctitle.classList.add('bloctitle','pa');
    bloctitle.innerHTML = "p";
    bloc.appendChild(bloctitle);
    const blocknum = document.createElement("span");
    blocknum.classList.add('blocknum');
    blocknum.innerHTML = "max 6";
    bloc.appendChild(blocknum);

    pheader.style.gridRow = 1;
    pheader.style.gridColumn = pgroup;
}

// pfam connectors
for (i = 0; i < pfam.length - px; i++)
{    
    const connector = document.createElement("div");  
    grido.appendChild(connector);
    connector.style.gridRow = Number(window.getComputedStyle(pfam[i],null).getPropertyValue("grid-row-start")) + 1;
    connector.style.gridColumn = Number(window.getComputedStyle(pfam[i],null).getPropertyValue("grid-column-start"));
    connector.classList.add('linedotted');
}
// pfam up lines
for (i = 1; i < pfam.length - px; i++)
{    
    const upline = document.createElement("div");  
    grido.appendChild(upline);
    upline.style.gridRow = Number(window.getComputedStyle(pfam[i],null).getPropertyValue("grid-row-start"));
    upline.style.gridColumn = Number(window.getComputedStyle(pfam[i],null).getPropertyValue("grid-column-start")) + 1;
    upline.classList.add('linedotted','shelline');
}

// pfam hat 
if (pfam.length > 0)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(pfam[0],null).getPropertyValue("grid-row-start")) - 1;
    hat.style.gridColumn = Number(window.getComputedStyle(pfam[0],null).getPropertyValue("grid-column-start"));
    hat.classList.add('curvedown');
    hat.id = "p-hat";
}

// pfam secondary hat 
if (pfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(pfam[1],null).getPropertyValue("grid-row-start")) - 2;
    hat.style.gridColumn = Number(window.getComputedStyle(pfam[1],null).getPropertyValue("grid-column-start")) + 1;
    hat.classList.add('curvedown');
}

// pfam secondary S 
if (pfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(pfam[1],null).getPropertyValue("grid-row-start")) - 1;
    hat.style.gridColumn = Number(window.getComputedStyle(pfam[1],null).getPropertyValue("grid-column-start")) + 1;
    hat.classList.add('connectdown');
}

// pfam entry arrow
if (pfam.length > 1)
{
    for (i = 2; i < pfam.length; i++)
    {   //the line
        const line = document.createElement("div");
        grido.appendChild(line);
        line.style.gridRow = Number(window.getComputedStyle(pfam[i],null).getPropertyValue("grid-row-start")) - 1;
        line.style.gridColumn = Number(window.getComputedStyle(pfam[i],null).getPropertyValue("grid-column-start")) + 1;
        line.classList.add('line');
    }
}

//#endregion pfam

//#region dfam

var dx;

if (dfam.length != 0)
{
    //if (dfam[dfam.length - 1].style.gridRow < document.getElementById(lastlvl).style.gridRow)
    //var lastolevel = document.getElementById(lastlvl);
    if (Number(window.getComputedStyle(lastolevel,null).getPropertyValue("grid-column-start")) == sgroup || Number(window.getComputedStyle(lastolevel,null).getPropertyValue("grid-column-start")) == pgroup)
        dx = 1;
    else if (dfam[dfam.length - 1].id == lastlvl)
        dx = 1;
    else
        dx = 0;

    // header 
    const dheader = document.createElement("div");
    grido.appendChild(dheader);
    dheader.classList.add('header');
    dheader.id = "dheader";
    const bloc = document.createElement("div");
    dheader.appendChild(bloc);
    const mnemonic = document.createElement("span");
    mnemonic.classList.add('mnemonic');
    mnemonic.innerHTML = "de";
    bloc.appendChild(mnemonic);
    const bloctitle = document.createElement("span");
    bloctitle.classList.add('bloctitle','de');
    bloctitle.innerHTML = "d";
    bloc.appendChild(bloctitle);
    const blocknum = document.createElement("span");
    blocknum.classList.add('blocknum');
    blocknum.innerHTML = "max 10";
    bloc.appendChild(blocknum);

    dheader.style.gridRow = 1;
    dheader.style.gridColumn = dgroup;
}



// dfam connectors
for (i = 0; i < dfam.length - dx; i++)
{    
    const connector = document.createElement("div");  
    grido.appendChild(connector);
    connector.style.gridRow = Number(window.getComputedStyle(dfam[i],null).getPropertyValue("grid-row-start")) + 1;
    connector.style.gridColumn = Number(window.getComputedStyle(dfam[i],null).getPropertyValue("grid-column-start"));
    connector.classList.add('linedotted');
}
// dfam up lines
for (i = 1; i < dfam.length - dx; i++)
{    
    const upline = document.createElement("div");  
    grido.appendChild(upline);
    upline.style.gridRow = Number(window.getComputedStyle(dfam[i],null).getPropertyValue("grid-row-start"));
    upline.style.gridColumn = Number(window.getComputedStyle(dfam[i],null).getPropertyValue("grid-column-start")) + 1;
    upline.classList.add('linedotted', 'shelline');
    upline.id = i + "d-upline"
}

// dfam hat 
if (dfam.length > 0)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(dfam[0],null).getPropertyValue("grid-row-start")) - 1;
    hat.style.gridColumn = Number(window.getComputedStyle(dfam[0],null).getPropertyValue("grid-column-start"));
    hat.classList.add('curvedown');
}

// dfam secondary hat 
if (dfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(dfam[1],null).getPropertyValue("grid-row-start")) - 2;
    hat.style.gridColumn = Number(window.getComputedStyle(dfam[1],null).getPropertyValue("grid-column-start")) + 1;
    hat.classList.add('curvedown');
}

// dfam secondary S 
if (dfam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(dfam[1],null).getPropertyValue("grid-row-start")) - 1;
    hat.style.gridColumn = Number(window.getComputedStyle(dfam[1],null).getPropertyValue("grid-column-start")) + 1;
    hat.classList.add('connectdown');
}

// dfam entry arrow
if (dfam.length > 1)
{
    for (i = 2; i < dfam.length; i++)
    {   //the line
        const line = document.createElement("div");
        grido.appendChild(line);
        line.style.gridRow = Number(window.getComputedStyle(dfam[i],null).getPropertyValue("grid-row-start")) - 1;
        line.style.gridColumn = Number(window.getComputedStyle(dfam[i],null).getPropertyValue("grid-column-start")) + 1;
        line.classList.add('line');
    }
}

//#endregion dfam

//#region ffam

var fx;
if (ffam.length != 0)
{
    if (Number(window.getComputedStyle(ffam[ffam.length - 1],null).getPropertyValue("grid-column-start")) != Number(window.getComputedStyle(lastolevel,null).getPropertyValue("grid-column-start")))
    fx = 1;
else if (ffam[ffam.length - 1].id === lastlvl)
    fx = 1;
else
    fx = 0;

// header 
const fheader = document.createElement("div");
grido.appendChild(fheader);
fheader.classList.add('header');
fheader.id = "fheader";
const bloc = document.createElement("div");
fheader.appendChild(bloc);
const mnemonic = document.createElement("span");
mnemonic.classList.add('mnemonic');
mnemonic.innerHTML = "feijão";
bloc.appendChild(mnemonic);
const bloctitle = document.createElement("span");
bloctitle.classList.add('bloctitle','fe');
bloctitle.innerHTML = "f";
bloc.appendChild(bloctitle);
const blocknum = document.createElement("span");
blocknum.classList.add('blocknum');
blocknum.innerHTML = "max 14";
bloc.appendChild(blocknum);

fheader.style.gridRow = 1;
fheader.style.gridColumn = fgroup;
}



// ffam connectors
for (i = 0; i < ffam.length - fx; i++)
{    
    const connector = document.createElement("div");  
    grido.appendChild(connector);
    connector.style.gridRow = Number(window.getComputedStyle(ffam[i],null).getPropertyValue("grid-row-start")) + 1;
    connector.style.gridColumn = Number(window.getComputedStyle(ffam[i],null).getPropertyValue("grid-column-start"));
    connector.classList.add('linedotted');
}
// ffam up lines
for (i = 1; i < ffam.length - fx; i++)
{    
    const upline = document.createElement("div");  
    grido.appendChild(upline);
    upline.style.gridRow = Number(window.getComputedStyle(ffam[i],null).getPropertyValue("grid-row-start"));
    upline.style.gridColumn = Number(window.getComputedStyle(ffam[i],null).getPropertyValue("grid-column-start")) + 1;
    upline.classList.add('linedotted', 'shelline');
}

// ffam hat 
if (ffam.length > 0)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(ffam[0],null).getPropertyValue("grid-row-start"))-1;
    hat.style.gridColumn = Number(window.getComputedStyle(ffam[0],null).getPropertyValue("grid-column-start"));
    hat.classList.add('curvedown');
    hat.id = "f-hat";
}

// ffam secondary hat 
if (ffam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(ffam[1],null).getPropertyValue("grid-row-start"))-2;
    hat.style.gridColumn = Number(window.getComputedStyle(ffam[1],null).getPropertyValue("grid-column-start")) + 1;
    hat.classList.add('curvedown');
    hat.id = "f-secondhat";
}

// ffam secondary S 
if (ffam.length > 1)
{
    const hat = document.createElement("div");
    grido.appendChild(hat);
    hat.style.gridRow = Number(window.getComputedStyle(ffam[1],null).getPropertyValue("grid-row-start")) - 1;
    hat.style.gridColumn = Number(window.getComputedStyle(ffam[1],null).getPropertyValue("grid-column-start")) + 1;
    hat.classList.add('connectdown');
}

// ffam entry arrow
if (ffam.length > 1)
{
    for (i = 2; i < ffam.length; i++)
    {   //the line
        const line = document.createElement("div");
        grido.appendChild(line);
        line.style.gridRow = Number(window.getComputedStyle(ffam[i],null).getPropertyValue("grid-row-start")) - 1;
        line.style.gridColumn = Number(window.getComputedStyle(ffam[i],null).getPropertyValue("grid-column-start")) + 1;
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
    hat.style.gridRow = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-row-start"))-1;
    hat.style.gridColumn = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-column-start"));
    hat.classList.add('curvedown');

    const danger = document.getElementsByClassName('linedotted');
    dangerArray = Array.from(danger);
    dangerArray.forEach(element => {
        //if(element.style.gridRow == 7 && element.style.gridColumn == 9)
        if(window.getComputedStyle(element,null).getPropertyValue("grid-row-start") == 7 && window.getComputedStyle(element,null).getPropertyValue("grid-column-start") == 9)
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
    hat.style.gridRow = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-row-start"))-1;
    hat.style.gridColumn = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-column-start"));
    hat.classList.add('curvedown');

    const danger = document.getElementsByClassName('linedotted');
    dangerArray = Array.from(danger);
    dangerArray.forEach(element => {
        if(window.getComputedStyle(element,null).getPropertyValue("grid-row-start") == 9 && window.getComputedStyle(element,null).getPropertyValue("grid-column-start") == 9)
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
    hat.style.gridRow = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-row-start"))-1;
    hat.style.gridColumn = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-column-start"));
    hat.classList.add('linedotted');
    const hatfeather = document.createElement("div");
    grido.appendChild(hatfeather);
    hatfeather.style.gridRow = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-row-start"))-2;
    hatfeather.style.gridColumn = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-column-start"))+1;
    hatfeather.classList.add('linedotted', 'shelline');
    const right = document.createElement("div");
    grido.appendChild(right);
    right.style.gridRow = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-row-start"))-1;
    right.style.gridColumn = Number(window.getComputedStyle(elbow,null).getPropertyValue("grid-column-start")) + 1;
    right.classList.add('line');

    const danger = document.getElementsByClassName('linedotted');
    dangerArray = Array.from(danger);
    dangerArray.forEach(element => {
        if(window.getComputedStyle(element,null).getPropertyValue("grid-row-start") == 11 && window.getComputedStyle(element,null).getPropertyValue("grid-column-start") == 7)
            element.style.backgroundColor = "transparent";
    });
}



//#endregion exceptions


//#endregion lines


//#region shell names and their electrons count

var shellnames = ["K","L","M","N","O","P","Q"];
var shellrow = 1;
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
    //var i = cell.style.gridRow;
    var i = window.getComputedStyle(cell,null).getPropertyValue("grid-row-start");
    filledcellrow.push(Number(i));
});
var lastrow = Math.max.apply(Math,filledcellrow);

// first column curves 
if (sfam[sfam.length - 1].id != document.getElementById(lastlvl).id)
    x = lastrow;
else
    x = lastrow - 1;
for (i = 3; i < x + 1; i+=2) {
        const newcell = document.createElement("div");  
        grido.appendChild(newcell);
        newcell.style.gridColumnStart = curvegroup;
        const myendrow = curvegroup + 1;
        newcell.style.gridColumnEnd = myendrow;
        //newcell.style.gridColumn = curvegroup;
        newcell.classList.add('emptycell'); 
        //if (i % 2 != 0)
        //{ 
        const myrow = Number(i + 1)    
        newcell.style.gridRow = myrow;
        newcell.classList.add('curveup');    
        newcell.id = i + "-first-curve";
        //}

  }  

// End arrow positioning
const lastcell = document.getElementById(lastlvl);
const xpos = Number(window.getComputedStyle(lastcell,null).getPropertyValue("grid-row-start")) + 1;
const ypos = Number(window.getComputedStyle(lastcell,null).getPropertyValue("grid-column-start")) - 1;

const lastarrow = document.getElementById('last');
lastarrow.style.gridRow = xpos;
lastarrow.style.gridColumn = ypos;




// last row spacers
for (i = 0; i < 12; i++) {
    const newcell = document.createElement("div");  
    grido.appendChild(newcell);
    newcell.classList.add('spacer'); 
    newcell.style.gridColumn = i;
    newcell.style.gridRow = 2;
}

//#endregion Levels' Starts and End

survivors.forEach(cell => {
    if (cell.style.visibility = "hidden")
    cell.style.visibility = "visible";
});

}
}


/*function ClearAll()
{
    console.log("cleaning everything, boss");
    var AllArray = Array.from(grido.childNodes)
    AllArray.forEach(element => {       
        if (element.id == 'last' || element.id == 'sheader')
            {
                element.style.visibility = "hidden";
            }
        else
        {
            if (element.classList != null && element.classList.contains('buttone') == false)
            //console.log(element)
            element.remove();
        }
        done = false;
            
    });
}*/