const imagesWrapper =document.querySelector(".images");
const loadmore =document.querySelector(".load-more");
const SearchImages=document.querySelector(".serach-box , input");
const ShowImages= document.querySelector(".Show-images");
const closeBt=  ShowImages.querySelector(".fa-circle-xmark");

// API key ,paginations,searchTerm variables
const apiKey="Sy1jkvNwesCNtYEDTE8zmNRtvV6GsDagBfNShR2YqNsqeA55TzWrtt75";
const perpage=15;
let currentpage=1;
let searchTerm =null;

const showImg=(name,img) =>{              //show images and setting img source,name
    ShowImages.querySelector("img").src=img;
    ShowImages.querySelector("span").innerText =name;
    ShowImages.classList.add("show");
    document.body.style.overflow ="hidden";
}   

const hideShowImages=()=>{
    ShowImages.classList.remove("show");
    document.body.style.overflow ="auto";
}

const generateHTML=(images)=>{
    //making li  of all fetched images and adding them to existing image wrapper


    imagesWrapper.innerHTML+=images.map(img =>
        `<li class="card" onclick ="showImg('${img.photographer}','${img.src.large2x}')">
            <img src="${img.src.large2x}" alt="img">
        <div class="detail">
           <div class="photographer">
               <i class="fa-solid fa-camera"></i>
               <span> ${img.photographer}</span>
           </div>
        </div>
       </li> `
       ).join("");

 }
const getImages=(apiURL) =>{
    //fetching images by API call with authorisation header
    loadmore.innerHTML="Loading..."
    loadmore.classList.add("disabled");
    fetch(apiURL,{
        headers:{ Authorization: apiKey }
    }).then (res => res.json()).then (data=>{
        generateHTML(data.photos);
        loadmore.innerText ="Load More"
        loadmore.classList.remove("disabled");
    }).catch(()=> alert("Failed in loading images!")); // showing alert when API not run
} 
const loadMoreImages=()=>{
    currentpage++;
    //if searchterm has some value then api call with search term else call default api
    let apiURL=`https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`;
    apiURL= searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentpage}&per_page=${perpage}`:apiURL;
    getImages(apiURL);
}

const loadSearchImg =(e) =>{
    if (e.target.value==="") return searchTerm =null;
// if enter key is pressed ,update current page ,search term & call the getImages

    if(e.key==="Enter"){
       currentpage=1;
       searchTerm=e.target.value;
       imagesWrapper.innerHTML="";
       getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentpage}&per_page=${perpage}`)
    }

}

getImages(  `https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`);
// getting 15 images with different detail
loadmore.addEventListener("click",loadMoreImages);
SearchImages.addEventListener("keyup", loadSearchImg);
closeBt.addEventListener("click",hideShowImages);