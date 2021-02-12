// #region tabbing focus outline

function handleFirstTab(e) {
    if (e.keyCode === 9) { //tab key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

window.addEventListener('keydown', handleFirstTab);

// #endregion tabbing focus outline

// #region highlighting element on click
function SelectElement() {
    this.classList.toggle('activeElement');
}
// #endregion

// #region property dropdown

var propertyButton = document.getElementById("info1dropdown");
var propertyDropdown = document.getElementById("setDropdown");
var propertyButtonField = document.getElementById("info1dropdownspan");
var propertyList = document.getElementById('setDropdownList');
var buttonOut = false;

propertyButton.addEventListener('click', function(){
    PeriodicButton();
})

function PeriodicButton(){
    if (buttonOut == false)
    {
        propertyDropdown.classList.add("setDropdownDown");
        buttonOut = true;
    }
    else {
        propertyDropdown.classList.remove("setDropdownDown");
        buttonOut = false;
    }
}

propertyList.addEventListener('click', function(event){
    propertyButtonField.innerHTML = event.target.innerHTML;
    ChangeProperty(event.target.dataset.property);
});

function ChangeProperty(props){
    console.log(props);
    let chemelems = document.getElementsByClassName("element");
    let chemelemsArray = Array.from(chemelems);
    //console.log(chemelemsArray);

    
    chemelemsArray.forEach(element => {
        //console.log(element.dataset.eneg)
        let field = element.querySelector(".info1span");
        switch(props)
    {
        case "mass":
            field.innerHTML = element.dataset.mass;
        break;

        case "eneg":
            field.innerHTML = element.dataset.eneg;
        break;

        case "eafi":
            field.innerHTML = element.dataset.eafi;
        break;
    }
        //field.innerHTML = element.dataset.props;
    })
}

// #endregion property dropdown

// #region Category Selection
var isOn = false;

var legends = document.getElementsByClassName("groupL");
legendsArray = Array.from(legends);

var legeButtons = document.getElementsByClassName("groupcolor");
legeButtonsArray = Array.from(legeButtons);

var legeTitles = document.getElementsByClassName("groupname-span");
var legeTitlesArray = Array.from(legeTitles);

// create the buttons
legendsArray.forEach(button => {
    var cat = button.dataset.cate;
    //add the eventlistener for click
    button.addEventListener("click", function(){
        ClickLege(cat);
    });
});

function ClickLege(cate){
    if (isOn) {
            ClearAllCat();
            isOn = false;                
    }

    else {
        Highlight(cate);
        isOn = true;
    }
    console.log("ison: ",isOn)
}

function Highlight(cat){  

    var allchem = document.getElementsByClassName("cell");
    var elem = Array.from(allchem); 
    
    // fade everyone
    elem.forEach(element => {
        element.classList.add("elementFade");
    });
    // highlight this fam
    let thisfam = document.getElementsByClassName(cat);
    let fam = Array.from(thisfam);
    fam.forEach(element => {
        element.classList.remove("elementFade");
    });
    // highlight this fam's name && fade everyone else's names...
    legeTitlesArray.forEach(element => {
        if (element.dataset.cate == cat)
        {
            element.classList.add('bolden');
        }
        else{
            element.classList.add('faden');
        }
    });
    // ...and their buttons
    legeButtonsArray.forEach(element => {
        if (element.classList.contains(cat)){
            return;
        }
        else {
            element.classList.add('faden');
        }
    });

}

function ClearAllCat(){

    var allchem = document.getElementsByClassName("cell");
    var elem = Array.from(allchem);

    elem.forEach(element => {
        element.classList.remove("elementFade");
    });
    // reset the legends titles...
    legeTitlesArray.forEach(element => {
        element.classList.remove('bolden');
        element.classList.remove('faden');
    });
    // ...and buttons
    legeButtonsArray.forEach(element => {
        element.classList.remove('faden');
    });
}

// #endregion Category Selection

//#region Overlay

var overlay = document.getElementById('overlayA');
var timeout = 500;
var closebutton = document.getElementById('close');
var infobox = document.getElementById('infobox');


closebutton.addEventListener("click", function(){       
    setTimeout(() => {
        KillOverlay();
    }, 100);
    ClearAll(); 
});

function RaiseOVerlay()
{
    overlay.style.height = "100%";
    setTimeout(() => {
        grido.style.display = "grid";
    }, timeout);


    if (window.matchMedia("(max-width: 700px)").matches) {
        overlay.style.width = "100%";
      } else {
        overlay.style.width = "40%";
      }

    closebutton.style.display = "flex";
    infobox.style.display = "block";
    table.classList.add("elementFade");
    
}

function KillOverlay()
{    
    
    setTimeout(() => {
        overlay.style.width = "0%";
    }, 50);    
    closebutton.style.display = "none";
    grido.style.display = "none";
    infobox.style.display = "none";
    table.classList.remove("elementFade");
}


// clear the distribution
function ClearAll()
{
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
}

//#endregion Overlay
