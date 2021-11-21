
export const getIncomingCallDialog = (callTypeInfo, acceptCallHandler, rejectCallHandler) => {
    console.log("Getting an inconming call");

    //The main dialog wrapper
    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');

    //The content wrapper
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog_content');
    dialog.appendChild(dialogContent);

    //The title of the dialog
    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = `Incoming ${callTypeInfo} Call`

    //Container to store the image 
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('dialog_image_container')

    //Image after the title of dialog
    const image = document.createElement('img');
    const avatarImagePath = "./utils/images/dialogAvatar.png";
    image.src = avatarImagePath;

    imageContainer.appendChild(image);

    //Button container
    const buttonCointainer = document.createElement('div');
    buttonCointainer.classList.add('dialog_button_container');

    //Accept button
    const acceptCallButton = document.createElement('button');
    acceptCallButton.classList.add('dialog_accept_call_button');
    const acceptCallImage = document.createElement('img');
    acceptCallImage.classList.add('dialog_button_image');
    const acceptCallImagePath = './utils/images/acceptCall.png';
    acceptCallImage.src = acceptCallImagePath;

    acceptCallButton.appendChild(acceptCallImage);

    buttonCointainer.appendChild(acceptCallButton);

    //Reject button
    const rejectCallButton = document.createElement('button');
    rejectCallButton.classList.add('dialog_reject_call_button');
    const rejectCallImage = document.createElement('img');
    rejectCallImage.classList.add('dialog_button_image');
    const rejectCallImagePath = './utils/images/rejectCall.png';
    rejectCallImage.src = rejectCallImagePath;

    rejectCallButton.appendChild(rejectCallImage);

    buttonCointainer.appendChild(rejectCallButton);

    //Appending the childs one by one.
    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(buttonCointainer);

    //Adding the event listeners to the buttons
    acceptCallButton.addEventListener("click", () => {acceptCallHandler()});
    rejectCallButton.addEventListener("click", () => {rejectCallHandler()});

    return dialog;

}

export const getCallingDialog = (rejectCallHandler) => {
    //The main dialog wrapper
    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');

    //The content wrapper
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog_content');
    dialog.appendChild(dialogContent);

    //The title of the dialog
    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = "Calling..."

    //Container to store the image 
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('dialog_image_container')

    //Image after the title of dialog
    const image = document.createElement('img');
    const avatarImagePath = "./utils/images/dialogAvatar.png";
    image.src = avatarImagePath;

    imageContainer.appendChild(image);

    //Button container
    const buttonCointainer = document.createElement('div');
    buttonCointainer.classList.add('dialog_button_container');

    //Reject button
    const hangUpButton = document.createElement('button');
    hangUpButton.classList.add('dialog_reject_call_button');
    const hangUpImage = document.createElement('img');
    hangUpImage.classList.add('dialog_button_image');
    const hangUpImagePath = './utils/images/hangUp.png';
    hangUpImage.src = hangUpImagePath;

    hangUpButton.appendChild(hangUpImage);

    buttonCointainer.appendChild(hangUpButton);

    //Appending the childs one by one.
    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(buttonCointainer);

    return dialog;
}

export const getInfoDialog = (dialogTitle, dialogDescription) => {

    //The main dialog wrapper
    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');

    //The content wrapper
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog_content');
    dialog.appendChild(dialogContent);

    //The title of the dialog
    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = dialogTitle;

    //Container to store the image 
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('dialog_image_container')

    //Image after the title of dialog
    const image = document.createElement('img');
    const avatarImagePath = "./utils/images/dialogAvatar.png";
    image.src = avatarImagePath;

    imageContainer.appendChild(image);

    //Description 
    const desc = document.createElement('p');
    desc.classList.add('dialog_description');
    desc.innerHTML = dialogDescription;

    //Appending the childs
    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(desc);

    return dialog;

}