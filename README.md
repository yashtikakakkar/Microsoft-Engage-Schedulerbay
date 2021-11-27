# SchedulerBay Application

## Microsoft Engage'21 Submission

### 🚩 Overview

#### ‣ Problem Statement

Build a functional prototype of a platform that gives students an array of digital academic and social tools to stay engaged with their studies, peers and broader university community during pandemic.

#### ‣ Proposed Solution

A Scheduler Application to bring hybrid mode of classes to life. With the ease in restrictions wrt Covid-19, many organizations have started to implement hybrid mode of classes which allows a certain number of students to attend classes in offline mode. This webapp helps in organizing the same by allowing students to submit weekly preferences for attending classes in offline mode. The seat allocation done on FCFS basis, will eventually provide a roster of students attending in offline mode to the faculty. <br>
This project has been solely built during the period of **Microsoft Engage'21 Mentorship Program** _conducted by Microsoft_ from the period of 8th November 2021 to 26th November 2021.

#### ‣ Live Link: https://schedulerbay.netlify.app/

### 🚩 Agile Methodology and Workflow

Agile methodology was implemented in 3 sprints, each sprint comprising of 6 days/week for 3 weeks. The intent of the project, to help teachers and students, their viewpoints and easy to use interface built were kept in mind during the development of this project. The web application has been hosted on Netlify.

| Week | Phase | Tasks | Status |
|------|-------|-------|--------|
|1   | **Designing and Planning** | <ul><li>Explored different ideas keeping uniqueness and timeline in mind.</li><li>Decided upon the tech-stack to be used.</li><li>Implemented UI layouts of all the pages.</li><li>Planned the feature flow of the project.</li></ul> | Completed |
|2   | **Implementation** | <ul><li>Implemented Sign In/Sign Out feature using Auth in Firebase.</li><li>Structured the collections in Firestore.</li><li>Implemented Class addition by Teacher and create a Join Class code.</li><li>Implemented Subject addition by Student using the same Join Class code.</li></ul> | Completed |
|3   | **Implementation contd. & Deployment** | <ul><li>Implemented booking an offline seat functionality for Student.</li><li>Implemented fetching and displaying of list of students attending offline class to the Teacher.</li><li>Testing on multiple use cases. (Bugs Fixed)</li><li>Deployed Schedulerbay using Netlify.</li></ul> | Completed |
  
### 🚩 Project Screenshots

| Page | Screenshot |
|--------------|------------|
| Landing Page | <img height="240px" src="https://user-images.githubusercontent.com/43854410/143673101-6b8c365b-b668-48ba-92c0-ed3e0779e316.gif"> |
| Teacher - Sign Up Page | <img height="240px" src="https://user-images.githubusercontent.com/43854410/143673561-822044ed-3610-411b-9c05-4ed21c7cffc9.png"> |
| Teacher - HomePage | <img height="240px" src="https://user-images.githubusercontent.com/43854410/143673531-33d02781-7b43-40f1-9a45-8d1777635d8e.gif"> |
| Teacher - Add Class Modal (with success alert) | <img height="240px" src="https://user-images.githubusercontent.com/43854410/143673624-0d0b317e-e71b-4b3d-93e2-27d56ade1d81.png"> |
| Teacher - Class Details Page | <img height="240px" src="https://user-images.githubusercontent.com/43854410/143673578-f1de22b3-d22a-42e1-8815-03ba72fd44de.png"> |
| Student - Sign Up Page | <img height="240px" src="https://user-images.githubusercontent.com/43854410/143673973-cb52a415-ab61-4baf-8354-ea13a8d40477.png"> |
| Student - HomePage | <img height="240px" src="https://user-images.githubusercontent.com/43854410/143674023-a8a9cbc2-5bcd-48bb-a188-b5e5df1faa56.png"> |
| Student - Add Subject Modal | <img height="240px" src="https://user-images.githubusercontent.com/43854410/143673929-379f9300-9455-44c8-9bfd-fb7bcdd404bd.png"> |
| Student - Subject Details Page ** | <img height="240px" src="https://user-images.githubusercontent.com/43854410/143674384-b413f3c0-f2e7-4e35-bc05-0c75cbd90c17.gif"> |

** Use Cases for booking an offline class slot:
- If student selects correct date where there is a class and is fully vaccinated -> Success confirmation alert
- If student selects correct date where there is a class but isn't vaccinated -> Vaccination required alert
- If student selects wrong date where there is no class OR the allowed limit of students has reached already -> No slots available alert
- If student selects wrong date outside the week -> Request to select a date within the week alert
- If student attempts to book multiple slots for same date and class -> Refrain from booking multiple slots alert

### 🚩 Installation Setup

#### 1. Clone App
  
  * Make a new folder and open the terminal there.
  * Write the following command and press enter.
  
  ```
    $ git clone https://github.com/yashtikakakkar/Microsoft-Engage.git
  ```
    
 #### 2. Install Node Packages
  * Write the following command and press enter to download all required node modules.
 
   ```
   $ npm install 
  ```
  
#### 3. Run Locally

 * While you are still inside the cloned folder, write the following command to run the website locally. 
 
 ```
   $ npm start
 ```



