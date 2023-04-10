import axios from "axios";
import {Registration} from "../classes"
import { loginAPI, getAllWorkersAPI, getAllJobsAPI, updateJobCompletionAPI } from "./APIs";
import { allJobsKey, allWorkerKey, registeredKey } from "./itemsKeys";
import { Job } from "../classes";


  
function sendJobData(accessToken: string, contents :Job):void {
 
  const yourConfig = {
    headers: {
       Authorization: accessToken
    }
 }
 console.log(yourConfig)
 axios.put(updateJobCompletionAPI,contents, yourConfig)
 .then((response) => {
   if(response.data =="cannot be empty" || response.data == "Et"){
   }else{
     const jsonUser = JSON.stringify(response.data)
     console.log(jsonUser, ": update attendence response")
     
   }
})
.catch((error) => {
   // Error 😨
   if (error.response) {
       
       console.log(error.response.data);
       console.log(error.response.status);
       console.log(error.response.headers);
   } else if (error.request) {
       /*
        * The request was made but no response was received, `error.request`
        * is an instance of XMLHttpRequest in the browser and an instance
        * of http.ClientRequest in Node.js
        */
       console.log(error.request);
   } else {
       // Something happened in setting up the request and triggered an Error
       console.log('Error', error.message);
   }
   console.log(error.config);

});

}

export {sendJobData}