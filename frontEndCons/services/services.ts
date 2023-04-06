import axios from "axios";
import {Registration, singletonAuth} from "../classes"
import { loginAPI } from "./APIs";


export function sendLoginRequest(email: any, password: any){
    const registration = new Registration(email.value, password.value);
   
    console.log(registration)
    const JSONOBJ = JSON.stringify(registration);
    console.log(JSONOBJ)
    axios.post(loginAPI, JSONOBJ, {headers:{'Content-Type':'application/json'}})
    .then((response) => {
      if (response.data =="failed password" || response.data == "Email doesn't exist"){
      }else{
        console.log(response.data.accessToken, " access token");
        const auth = singletonAuth.getInstance(response.data.accessToken);
        const stringfyUser = JSON.stringify(registration);
        localStorage.setItem('registered',stringfyUser)
        if(response.data.accessControl === 1){
          console.log(response.data.accessControl, " in TEACHER CONRTOLLKER")
          let promiseArr: Promise<any>[] = [];
          promiseArr[0] = getAllStudents(response.data.accessToken);
          promiseArr[1] = getAllStudentAttendences(response.data.accessToken);
          Promise.all(promiseArr).then((values) => {
            console.log(values)
            console.log("inside teacher promise");
          }).catch(error=> console.log('error'))
        }else if(response.data.accessControl === 0){
          console.log(response.data.accessControl, " in student CONRTOLLKER")
          let promiseArr: Promise<any>[] = [];
          Promise.all(promiseArr).then((values) => {
            console.log(values)
          }).catch(error=> console.log('error'))
        }
      }
      console.log(response);
     
  })
  .catch((error) => {
      // Error 😨
      if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
       
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
    
    console.log(email.value);

  }


function getAllStudents(accessToken: string):Promise<any>{
  return new Promise((resolve, reject )=>{
    
    const yourConfig = {
      headers: {
          Authorization: accessToken
      }
    }
    axios.get('http://localhost:8888/api/students/getAll', yourConfig)
    .then((response) => {
      if(response.data =="Admin Only Access" || response.data == "Email doesn't exist"){
      }else{
        const jsonUser = JSON.stringify(response.data)
        console.log(jsonUser, ": All Students")
        localStorage.setItem('allStudents',jsonUser)
        resolve(response);
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
      reject(error)
  });
  })
}

function getAllStudentAttendences(accessToken: string):Promise<any>{
  return new Promise((resolve, reject )=>{
    const yourConfig = {
      headers: {
         Authorization: accessToken
      }
   }
   axios.get('http://localhost:8888/api/attendence/getAllAttendences', yourConfig)
   .then((response) => {
     if(response.data =="token not valid" || response.data == "Access denied"){
     }else{
       const jsonUser = JSON.stringify(response.data)
       console.log(jsonUser, ": teacher All Attendences")
       localStorage.setItem('allStudentAttendences',jsonUser)
       resolve(response);
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
     reject(error)
  });
  })
} 

function getGroupPercentages(accessToken: string):Promise<any>{
    return new Promise((resolve, reject )=>{
      const yourConfig = {
        headers: {
           Authorization: accessToken
        }
     }
     axios.get('http://localhost:8888/api/attendence/getGroupAttendence', yourConfig)
     .then((response) => {
       if(response.data =="Admin Only Access" || response.data == "Some error occurred while getting group attendence."){
       }else{
         const jsonUser = JSON.stringify(response.data)
         console.log(jsonUser, ": group Percentages")
         localStorage.setItem('groupPercentages',jsonUser)
         resolve(response);
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
       reject(error)
    });
    })
  
  }

  