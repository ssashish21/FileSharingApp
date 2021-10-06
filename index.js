const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileInput = document.querySelector("#fileInput");
const unsignedUploadPreset = 'nhmvf1es';

const progressContainer = document.querySelector(".progress-container");
const bgProgress = document.querySelector(".bg-progress");
const percentDiv = document.querySelector("#percent");
const progressBar = document.querySelector(".progress-bar");

const host = "https://api.cloudinary.com/v1_1/ssashish21/"
const uploadURL = `${host}/upload`;
// const uploadURL = `${host}api/files`;

dropZone.addEventListener("dragover" , (e) =>{
    e.preventDefault()

    if(!dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged");
    }
}); 

dropZone.addEventListener("dragleave" , ()=>{
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop" , (e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    
    const files = e.dataTransfer.files;
    console.log(files);
    if(files.length){
        fileInput.files = files;
        uploadFile()
    }
});

fileInput.addEventListener("change" , ()=>{
    uploadFile();
});

browseBtn.addEventListener("click" , ()=>{
    fileInput.click();
});

const uploadFile = ()=>{
    progressContainer.style.display = "block";
    const file = fileInput.files[0];
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.open("POST" , uploadURL , true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');


    xhr.upload.onprogress = updateProgress;


    //while changing states
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == XMLHttpRequest.DONE){
            // console.log(xhr.response);
            showLink(JSON.parse(xhr.response));
        }
    };
    formData.append('upload_preset', unsignedUploadPreset);
    formData.append("file" , file);

    xhr.send(formData);
};

const updateProgress = (e)=> {
    const percent = Math.round((e.loaded / e.total) * 100);
    // console.log(percent);
    bgProgress.style.width = `${percent}%`;
    percentDiv.innerText = percent;
    progressBar.style.transform = `scaleX(${percent/100})`;
};

const showLink = (res)=>{
    console.log(res.secure_url); // display link
    progressContainer.style.display = "none";
}