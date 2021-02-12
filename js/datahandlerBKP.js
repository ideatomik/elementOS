var table = document.getElementById('table');

function loadJSON(callback) {
      var request = new XMLHttpRequest();
      request.open("GET", "data/data.json", true);
      request.send(null);
      request.onreadystatechange = function() {
        if ( request.readyState === 4 && request.status === 200 ) {
          callback(request.responseText);
        }        
      }
}

function init() {
  loadJSON(function(response) {
    let chemdata = JSON.parse(response)      
      chemdata.elements.forEach(element => {

    // ignore the hypotethical Ununennium
    if (element.number != 119) {
    // create the element box
      const newBox = document.createElement("div");        
      newBox.classList.add('cell');      
      newBox.style.gridColumn = element.xpos + 1;
      newBox.style.gridRow = element.ypos + 1;
      table.appendChild(newBox);
    // create the element div
      const newEl = document.createElement("div");    
      newBox.appendChild(newEl)
      newEl.classList.add('element');

    // category switch
    switch(element.category){
      case "alkali metal":
        newBox.classList.add('cat1');
      break;
  
      case "alkaline earth metal":
        newBox.classList.add('cat2');
      break;
  
      case "transition metal":
        newBox.classList.add('cat3');
      break;
  
      case "lanthanide":
        newBox.classList.add('cat4');
      break;
  
      case "actinide":
        newBox.classList.add('cat5');
      break;
  
      case"post-transition metal":
      newBox.classList.add('cat6');
      break;
  
      case "metalloid":
        newBox.classList.add('cat7');
      break;
  
      case "nonmetal":
        newBox.classList.add('cat8');
      break;
  
      case "halogen":
        newBox.classList.add('cat9');
      break;
  
      case "noble gas":
        newBox.classList.add('cat10');
      break;

      case "unique":
        newBox.classList.add('cat12');
      break;
  
      default:
        newBox.classList.add('cat11');
    }

    // number
      const newNum = document.createElement("div");    
      const newNumSpan = document.createElement("span");
      const numText = document.createTextNode(element.number);
      newNumSpan.appendChild(numText);
      newNum.appendChild(newNumSpan);
      newEl.appendChild(newNum);
    
      newNum.classList.add('number');
      newEl.dataset.number = element.number;

   // symbol
      const newSym = document.createElement("div");    
      const newSymSpan = document.createElement("span");
      const symText = document.createTextNode(element.symbol);
      newSymSpan.appendChild(symText);
      newSym.appendChild(newSymSpan);
      newEl.appendChild(newSym);

      newSym.classList.add('symbol');
      newEl.dataset.symbol = element.symbol;

      if (element.number >= 95 && element.number <= 118)
      {
        newSym.classList.add('synthetic');
        newEl.classList.add('syn');
      }

    // name
      const newName = document.createElement("div");    
      const newNameSpan = document.createElement("span");
      const nameText = document.createTextNode(element.name);
      newNameSpan.appendChild(nameText);
      newName.appendChild(newNameSpan);
      newEl.appendChild(newName);

      newName.classList.add('name');
      newEl.dataset.name = element.name;
      

    // info1
      const newInf = document.createElement("div");    
      const newInfSpan = document.createElement("span");
      const infoText = document.createTextNode(element.atomic_mass.toPrecision(5));
      newInfSpan.appendChild(infoText);
      newInfSpan.classList.add('info1span')
      newInf.appendChild(newInfSpan);
      newEl.appendChild(newInf);

      newInf.classList.add('info1');
      newEl.dataset.mass = element.atomic_mass.toPrecision(5);

    // shells (nível eletrônico)
      const newShells = document.createElement("div");    
      const newShellsSpan = document.createElement("span");
      const rawshells = JSON.stringify(element.shells);
      const refinedshells = rawshells.replace(/[\[\]']+/g,'');
      const shells = refinedshells.split(" ").join("\n");
      const shellsText = document.createTextNode(shells.replace(/,/g, ' '));
      newShellsSpan.appendChild(shellsText);
      newShells.appendChild(newShellsSpan);
      newEl.appendChild(newShells);

      newShells.classList.add('shells');
      newEl.dataset.shells = element.shells;

    // electronegativity     
      newEl.dataset.eneg = element.electronegativity_pauling;

    // electron affinity
      if (element.electron_affinity != "---")
          newEl.dataset.eafi = element.electron_affinity.toPrecision(5);
      else
      newEl.dataset.eafi = "---";
    // electron configuration
      newEl.dataset.electron_configuration = element.electron_configuration;
      newEl.dataset.electron_configuration_semantic = element.electron_configuration_semantic;
    // molar heat kelvin
      newEl.dataset.molar_heat_kelvin = element.molar_heat;

    // click listener
    newBox.addEventListener("click", SelectElement);

    // tab navigation
    // newEl.tabIndex = 2;

        } 
    });
  })

  //group numbers
    var i;
    for (i = 1; i < 19; i++) {
      const newgroup = document.createElement("div");    
      const newgroupSpan = document.createElement("span");
      const newgroupText = document.createTextNode(i);
      newgroupSpan.appendChild(newgroupText);
      newgroup.appendChild(newgroupSpan);
      table.appendChild(newgroup);
      newgroup.classList.add('group');
      newgroup.style.gridColumn = i + 1;
      
      if (i == 1 || i == 18)
          newgroup.style.gridRow = 1;
      else if (i == 2 || i >= 13 && i <= 17)
          newgroup.style.gridRow = 2;
      else 
          newgroup.style.gridRow = 4;
    } 
}

window.onload = init();