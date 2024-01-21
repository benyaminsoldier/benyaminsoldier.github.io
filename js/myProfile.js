// Creates a LocalStorage for JobExp.
//Definition of Object 
var JobExp = JSON.parse(localStorage.getItem('JobExp')) || {
    myProfile: 'url',
    corcuencas: "url",
    hrmd:"url",
    falatex:"url",
    argos:"url",
    workExpPages:[],
    jobIndex:0,
};
JobExp.myProfile = "./myProfile.html";
JobExp.corcuencas = "./corcuencas.html";
JobExp.hrmd = "./hrmdmanagement.html";
JobExp.solvo = "./solvo.html";
JobExp.falatex = "./falatex.html";
JobExp.argos = "./argos.html";
JobExp.workExpPages = [JobExp.corcuencas, JobExp.hrmd, JobExp.solvo, JobExp.falatex, JobExp.argos];


//---------------------------------------------------------------------------------------------------------
//First approach for moving between .work-exp pages without returnin to myProfile.
//However, through this approach it was necessary to define the url of each of next/last .work-exp pages.
//The thing with the other approach is that JSON language was required to keep the value of jobIndex updated even when the browser reset between page changes.
//At the begining my logic was towards creating an object so the jobIndex property could be passed by reference.
//But with the window.onload() execution for each webpage, this object's property was set to 0 every time.
//---------------------------------------------------------------------------------------------------------

window.onload = function(){
    setProfile();
}

function setProfile(){
   enableWorkExp();
   enablePreview();
   enableClimb(); 
   
   
}


//Block for Climbing

/*
This block is for the climb section that will enable the gallery as well

*/

function enableClimb(){
    
    let currentWebPage = document.getElementsByTagName("html")[0];
    let currentWebPageName = currentWebPage.id;
    
    if(currentWebPageName == "Climbing"){
        enableGallery();
        const profileButtom = document.querySelector(".back-to-profile");
        profileButtom.addEventListener("mouseover", function(){
            profileButtom.style.cursor = "pointer";
            profileButtom.style.color = "rgb(248, 54, 115)";
        });
        profileButtom.addEventListener("mouseout", function(){
            profileButtom.style.cursor = "inherit";
            profileButtom.style.color = "rgb(63, 72, 204)";
        });
        profileButtom.addEventListener("click", function(){
            goTo(JobExp.myProfile);
        });

    }
    if(currentWebPageName == "MyProfile"){
        const climbing = "./climbing.html"
        const climbingButton = document.getElementById("gotoclimbing");
        if(climbingButton){
            climbingButton.addEventListener("mouseover", function(){
                climbingButton.style.cursor = "pointer";
                climbingButton.style.color = "rgb(248, 54, 115)";
            });
            climbingButton.addEventListener("mouseout", function(){
                climbingButton.style.cursor = "inherit";
                climbingButton.style.color = "rgb(63, 72, 204)";
            });
            climbingButton.addEventListener("click", function(){
                climbingButton.style.color = "rgb(248, 54, 115)";
                goTo(climbing);

            });
        } else{ console.error("button not working");}
    } 
}

function enableGallery(){
    let currentWebPage = document.getElementsByTagName("html")[0];
    let currentWebPageName = currentWebPage.id;
    if(currentWebPageName == "Climbing"){
    var numImg = 1;
    var totalImg = 7;
    var nextButton = document.getElementById('next');
    var prevButton = document.getElementById('prev');    
   
        function changeSrc(){

            var source ='/./images/climbing/img'+ numImg + '.PNG';
            var currentImage = document.getElementById('mainImg');
            currentImage.src = source;
        } 
        
        nextButton.addEventListener("mouseover", function(){
            nextButton.style.cursor = "pointer";
            nextButton.style.color = "rgb(248, 54, 115)";
        });
        nextButton.addEventListener("mouseout", function(){
            nextButton.style.cursor = "inherit";
            nextButton.style.color = "rgb(63, 72, 204)";
        });
        nextButton.addEventListener("click", function(){      
            numImg++;                    
            if(numImg > totalImg){
                numImg = 1;
            }
            changeSrc();
        });
        prevButton.addEventListener("mouseover", function(){
            prevButton.style.cursor = "pointer";
            prevButton.style.color = "rgb(248, 54, 115)";
        });
        prevButton.addEventListener("mouseout", function(){
            prevButton.style.cursor = "inherit";
            prevButton.style.color = "rgb(63, 72, 204)";
        });
        prevButton.addEventListener("click", function(){      
            
            
            numImg--;                           
            if(numImg < 1){
                numImg = 7;
            }
            changeSrc();
        });
    
    }

}

//Block for preview
/*
The idea of the preview is to pop out a small window with an image and a short but concise description
of what COD and BOD mean. The elements will listen to clicks leading to a webpage with information 
about the tests. However this page is property of sombedy else. The idea is only to simulate the preview window.
*/
      


function enablePreview(){
    let currentWebPage = document.getElementsByTagName("html")[0];
    let currentWebPageName = currentWebPage.id;

    const spanBOD = document.getElementById("BOD");
    const popoutBOD = document.createElement("span");
    popoutBOD.classList.add("pop-out");        
    const previewImg = document.createElement("img");
    previewImg.classList.add("pop-out");
    const previewTxt = document.createElement("p");
    previewTxt.classList.add("pop-out");
    previewTxt.innerHTML = "BOD5 stands for Biochemical Oxygen Demand over a 5-day period. It measures the amount of oxygen microorganisms consume while breaking down organic matter in water, indicating water quality and organic pollution levels."
    
    const spanCOD= document.getElementById("COD");
    const popoutCOD = document.createElement("span");
    popoutCOD.classList.add("pop-out2");        
    const previewImg2 = document.createElement("img");
    previewImg2.classList.add("pop-out2");
    const previewTxt2 = document.createElement("p");
    previewTxt2.classList.add("pop-out2");
    previewTxt2.innerHTML = "The Chemical Oxygen Demand, is a water quality test that measures the amount of oxygen required to chemically oxidize organic and inorganic substances in water. It provides an indicator of the water's pollution level and its ability to support aquatic life.";



    if(currentWebPageName == "MyProfile"){
        spanBOD.appendChild(popoutBOD);
        popoutBOD.appendChild(previewImg);
        popoutBOD.appendChild(previewTxt);

        spanCOD.appendChild(popoutCOD);
        popoutCOD.appendChild(previewImg2);
        popoutCOD.appendChild(previewTxt2);
                
        spanBOD.addEventListener("mouseover", function(){     
            popoutBOD.style.display = "flex";
        });
        spanBOD.addEventListener("mouseout", function(){     
            popoutBOD.style.display = "none";
        });
        spanCOD.addEventListener("mouseover", function(){     
            popoutCOD.style.display = "flex";
        });
        spanCOD.addEventListener("mouseout", function(){     
            popoutCOD.style.display = "none";
        });
    }

}




//Block for Work-Experience: 
/*

- Make the list Items headings access points for more detailed information.

- Once into the the new work-exp page. The user will be able to navigate through the 
  the different work experience without needing to return to the MyProfil page.

*/
function enableWorkExp(){

    let currentWebPage = document.getElementsByTagName("html")[0];
    let currentWebPageName = currentWebPage.id;
    let workExpWebPage = document.getElementsByClassName("work-exp")[0];
// Specifies what value jobIndex should start with every time we change webpages.
/*
If we are located at myProfile and we select  HRMD.work-exp, 
the jobIndex value should be the set up to 1.
 */
    if (currentWebPageName === "MyProfile") {
        // Reset jobIndex to 0 when on the myProfile page
        JobExp.jobIndex = 0;
        localStorage.removeItem('JobExp'); // Clear JobExp from localStorage
    } else if (workExpWebPage) {
        // Reset jobIndex to 0 when entering a work-exp page
        if (!localStorage.getItem('JobExp')) {
            JobExp.jobIndex = 0;
            localStorage.setItem('JobExp', JSON.stringify(JobExp));
        }
    }


//-------------------------------  myProfile DOM  ---------------------------------------------------
   
// Check if the 'work' section and heading elements exist before adding event listeners
    if(currentWebPageName == "MyProfile"){
        
        const workSection = document.getElementById('work');    
        const headingElements = document.querySelectorAll("#work h3");
        //Executes only if it can get the elements (the headings and their container.) from the DOM
        if (!workSection || !headingElements.length) {
            //Console error is better than console log in terms of detecting errors.
            console.error("Unable to find necessary elements for work experience. Exiting...");
            return;
        }

        // Add click event listeners for each heading element
        // Assigns the respective url argument to goTo(url);
        headingElements.forEach((heading, index) => {
            heading.addEventListener("click", function () {
                if (index < JobExp.workExpPages.length) {
                    JobExp.jobIndex = index;
                    localStorage.setItem('JobExp', JSON.stringify(JobExp));
                    goTo(JobExp.workExpPages[index]);
                }
            });
        });
        
    }
/*
First checks if we are located in a .workExpWebPage and not in an "education" or myProfile main page for example
Allows us to navigate through this webpages without coming back to myProfile's page.
Like a gallery but with webpages.
Once the boundaries have been met, the respective button will bring us back to myProfile.
*/

    if(workExpWebPage){
        const backToProfileButton = currentWebPage.getElementsByClassName("back-to-profile")[0];
        const backButton = currentWebPage.getElementsByClassName("back")[0];
        const nextButton = currentWebPage.getElementsByClassName("next")[0];
        
        if(backToProfileButton){
            backToProfileButton.addEventListener("click", function(){
                goTo(JobExp.myProfile);
            });
        }
        if (nextButton) {
            nextButton.addEventListener("click", function () {
                JobExp.jobIndex++;
                //localStorage.setItem('JobExp', JSON.stringify(JobExp)); // Save JobExp to localStorage
                if(JobExp.jobIndex > JobExp.workExpPages.length-1){
                    localStorage.setItem('JobExp', JSON.stringify(JobExp)); // Save JobExp to localStorage
                    goTo(JobExp.myProfile);
                }else{
                    localStorage.setItem('JobExp', JSON.stringify(JobExp)); // Save JobExp to localStorage
                    goTo(JobExp.workExpPages[JobExp.jobIndex]);
                }                    
            });
        } 
        if(backButton){
            backButton.addEventListener("click", function(){
                JobExp.jobIndex--;

                if(JobExp.jobIndex < 0){
                    localStorage.setItem('JobExp', JSON.stringify(JobExp)); // Save JobExp to localStorage
                    goTo(JobExp.myProfile);
                }else{
                    localStorage.setItem('JobExp', JSON.stringify(JobExp)); // Save JobExp to localStorage
                    goTo(JobExp.workExpPages[JobExp.jobIndex]);
                }
            });
        }
    }
}

function goTo(url){
        window.open(url, "_self");        
}


//---------------------------------------------------------------------------------------------------------
//First approach for moving between .work-exp pages without returnin to myProfile.
//However, through this approach it was necessary to define the url of each of next/last .work-exp pages.
//The thing with the other approach is that JSON language was required to keep the value of jobIndex updated even when the browser reset between page changes.
//At the begining I tried to create an object so the jobIndex property could be passed by reference.
//But with the window.onload() execution for each webpage, this object's property was set to 0 every time.
//---------------------------------------------------------------------------------------------------------

/*
    if (currentWebPageName == "Corcuencas") {
        const backButton = currentWebPage.getElementsByClassName("back")[0];
        const nextButton = currentWebPage.getElementsByClassName("next")[0];
        if (backButton) {
            backButton.addEventListener("click", function () {
                goTo(myProfile);
            });
        } else {
            console.error("Back button not found on Corcuencas page. Exiting...");
        }
        if (nextButton) {
            nextButton.addEventListener("click", function () {
                goTo(myProfile);
            });
        } else {
            console.error("Next button not found on Corcuencas page. Exiting...");
        }
    }
*/

/*      
        if (backButton) {
        
            backButton.addEventListener("click", function () {
                if(jobIndex < 0){
                    goTo(myProfile);
                }  
                goTo(workExpPages[jobIndex]);
                jobIndex -=1;  
            });
        } else{
            console.error("Next button not found on Corcuencas page. Exiting...");
            return;
        
        } 
*/    
    
