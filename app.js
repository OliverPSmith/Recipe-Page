////////// Opening the Modal

const openBtn = document.getElementById('add-recipe-button');
const closeBtn = document.getElementById('close-button');
const modal = document.getElementById('myModal');

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

////////// Adjust Modal Size

const modalContent = document.getElementById('modal-content');
const adjuster = document.createElement('div');

adjuster.style.width = "40px";
adjuster.style.height = "40px";
adjuster.style.background = "LemonChiffon";
adjuster.style.position = "absolute";
adjuster.style.right = "0";
adjuster.style.bottom = "0";
adjuster.style.cursor = "se-resize";
adjuster.style.fontSize = "1em";

const adjusterContents = `Min/<br>Max`;
adjuster.innerHTML = adjusterContents;
modalContent.appendChild(adjuster);
adjuster.addEventListener('dblclick', modalStart, false);

function modalStart(e) {
    window.addEventListener('mousemove', changeSize, false);
    window.addEventListener('mouseup', changeSizeStop, false);
}

function changeSize(e) {
    modalContent.style.width = (e.clientX - modalContent.offsetLeft) + "px";
    modalContent.style.height = (e.clientY - modalContent.offsetTop) + "px";
}

function changeSizeStop(e) {
    window.removeEventListener('mousemove', changeSize, false);
    window.removeEventListener('mousemove', changeSizeStop, false);
}

////////// Move Modal Anyewhere

window.onload = addListeners();

function addListeners() {
    const dragBtn = document.getElementsByClassName('drag-button')[0]
    .addEventListener('dblclick', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
    modalContent.style.position = "absolute";
    modalContent.style.top = e.clientY + "px";
    modalContent.style.left = e.clientX + "px";
}

/// Refresh Modal

const refreshBtn = document.getElementById('refresh');
const titleInput = document.getElementById('title-input');
const notesInput = document.getElementById('notes-input');
const ingredientsInput = document.getElementById('ingredients-input');
const methodsInput = document.getElementById('method-input');
const veganInput = document.getElementById('vegan');
const vegetarianInput = document.getElementById('vegetarian');
const pescyInput = document.getElementById('pescy')


function clearInput() {
    titleInput.value = " ";
    notesInput.value = " ";
    ingredientsInput.value = " ";
    methodsInput.value = " ";
    veganInput.value = " ";
    vegetarianInput.value = " ";
    pescyInput.value = " ";
}

refreshBtn.addEventListener('click', clearInput);



////////// Submitting Modal information to recipe feed

const submitButton = document.getElementById('submit-button');
const recipeFeed = document.getElementById('new-recipe-land');


function addRecipe(event) {
    let submitButton = event.target;
    const title = document.getElementById('title-input').value;
    const notes = document.getElementById('notes-input').value;
    const ingredients = document.getElementById('ingredients-input').value;
    const method = document.getElementById('method-input').value;
    const canVegan = document.getElementById('vegan').value;
    const canVegy = document.getElementById('vegetarian').value;
    const canPescy = document.getElementById('pescy').value;
    addRecipeToFeed(title, notes, ingredients, method, canVegan, canVegy, canPescy);
}



function addRecipeToFeed(title, notes, ingredients, method, canVegan, canVegy, canPescy) {
    const listItem = document.createElement('div');

    const listItemContents = `<div class="list-item">

    <div class="list-item-split">
        <div class="recipe-info">
            <strong class="title section-title">${title}</strong>
            <p class="new-description">${notes}</p>
        </div>
    </div>

    <div class="list-item-split">
        <div class="new-who-can-eat">
            <strong class="section-title"> Who Can Eat?</strong>
            <p>Vegetarian: ${canVegy}</p>
            <p>Vegan: ${canVegan}</p>
            <p>Pescetarian: ${canPescy}</p>

            <div class="like-and-save">
                <button class="new-save-button">Save Me</button>
                <button class="thumbs-up-button">&#10003;</button>
            </div>
        </div>
    </div>

    

    <div>
        <p id="scroll-more">Scroll Down To See More</p>
    </div>
    
    <div class="new-show-more-content">
        <div class="new-ingredients">
            <div class="new-i-m">
                <h5 class="section-title">Ingredients</h5>
                <p class="new-ingredients">${ingredients}</p>
            </div>
        </div>

        <div class="new-i-m">
            <div class="new-method">
                <h5 class='section-title'>Method</h5>
                <p class="new-method">${method}</p>
            </div>
        </div>
    </div>
</div>  `

listItem.innerHTML = listItemContents
recipeFeed.append(listItem)
listItem.getElementsByClassName('new-save-button')[0].addEventListener('click', newCloneToSaved, {once:true});
listItem.getElementsByClassName('thumbs-up-button')[0].addEventListener('click', happyClickAll);
};



submitButton.addEventListener('click', addRecipe);



////////// Saving item to saved recipes

const savedLanding = document.getElementById('saved-landing');
const listItem = document.getElementsByClassName('list-item');



// adding the original recipes to saved
const saveButton = document.getElementsByClassName('save-button');
    for (let i = 0; i < saveButton.length; i++) {
        const saveBtn = saveButton[i];

        function cloneToSaved() {
            const cln = saveBtn.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
            savedLanding.appendChild(cln);       
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            cln.appendChild(removeButton);
            // remove items from saved
            removeButton.addEventListener('click', function() {
                this.parentElement.remove();
            })
            // style the remove button
            const removeButtonText = `X`
            removeButton.innerHTML = removeButtonText;

            saveBtn.add.classList('save-button');
        };
        saveBtn.addEventListener('click', cloneToSaved, {once:true});
    };


// adding the new items to saved
function newCloneToSaved(event) {
    buttonClicked = event.target;
    btnClicked = buttonClicked.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
    savedLanding.appendChild(btnClicked);
    const newRemoveButton = document.createElement('button');
    newRemoveButton.classList.add('remove-button');
    btnClicked.appendChild(newRemoveButton);
    // remove items from saved
    newRemoveButton.addEventListener('click', function() {
        this.parentElement.remove();
    });
    // style the remove button
    const removeButtonText = `X`
    newRemoveButton.innerHTML = removeButtonText;
};    



////////// adding thumbs up feature


const thumbsUpButton = document.getElementsByClassName('thumbs-up-button');
for (let i = 0; i < thumbsUpButton.length; i++) {
    const thumbsUp = thumbsUpButton[i];

    function happyClick() {
        thumbsUp.parentElement.parentElement.parentElement.parentElement.style.background = "LavenderBlush";
    }; 
    thumbsUp.addEventListener('click', happyClick);

    // thumbs up on all 
function happyClickAll(event) {
    tUBtn = event.target;
    tUBtn.parentElement.parentElement.parentElement.parentElement.style.background = "LavenderBlush";
};
};




////////// create the search filter

document.getElementById('search-bar').addEventListener('keyup', function() {
    const searchInput = this.value.toLowerCase();
    const recipeName = document.getElementsByClassName('title');

    for (let i of recipeName) {
        let item = i.innerHTML.toLowerCase();
        if (item.indexOf(searchInput) == -1) {
            i.parentElement.parentElement.parentElement.style.display = "none";
        }   else {
            i.parentElement.parentElement.parentElement.style.display = "block";
        }
    };
});





