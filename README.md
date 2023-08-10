# [How Much?](https://64cd3acbdad64a3cc32bab3c--playful-pavlova-3da57a.netlify.app)

<img width="1417" alt="home" src="https://github.com/RevoU-FSSE-2/week-7-gkorompis/assets/52250424/b222270e-9a3a-4323-a03d-bb188b40a405">

## 1. Introduction

How Much? is a user-friendly Finance App designed to help you track your cash flow effectively. It offers a simple and intuitive interface to record your income and expenses, providing you with valuable insights into your financial habits.


## 2. Documentation Contents

1. Introduction
2. Documentation Contents
3. Application Overview: Main Feature, Dependencies, and API Documentation
4. Cloud-computing Preparation
5. Client-side Build and Deployment
6. Server-side Build and Deployment


## 3. Application Overview

### 3.1 Main Feature
### 3.2 Dependencies
### 3.3 API Documentation
1. BaseURL:
```
https://2oztga8zl7.execute-api.ap-southeast-3.amazonaws.com/dev
```

2. GET endpoints:
```
<baseurl>/transactions
# fetch all documents, require query "bearer=true" try <baseurl>/transactions?bearer=true

/transactions/:ObjectID
# fetch one document based on ObjectId, try <baseurl>/transactions/64d36c34b2cba04b48d16dce
```
<img width="1391" alt="get id" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/24253f39-2f9a-4433-8fd2-13d4d20c448e">

3. POST endpoint:
```
<baseurl>/transactions/
# try <baseurl>/transactions?bearer=true
# body example:
{
   "transactionAmount": 133,
   "transactionDate": "13-08-2023",
   "transactionWallet": "Monthly Income",
   "transactionPocket": "Holiday",
   "transactionTag": "Jalan-jalan",
   "transactionDetails": "Have fun"
}
#Note your New Object ID 
```
<img width="1422" alt="post" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/0d396a17-737f-476e-adc7-6e733544a1a7">

4. PUT endpoint:
```
<baseurl>/transactions/:ObjectID
# update one document, require query "bearer=true" try <baseurl>/transactions/<foo>?bearer=true
# body example:
{
   "transactionDetails": "Vacation"
}
```
<img width="1385" alt="put" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/441a53d8-0384-4ee6-88aa-70e153ef1312">

5. DELETE endpoint:
```
<baseurl>/transactions/:ObjectID
# update one document, require query "bearer=true" try <baseurl>/transactions/<foo>?bearer=true
```
<img width="1392" alt="delete" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/16fc1e9c-3faf-43c3-bde9-f21316f6bdc4">


## 4. Cloud-computing Preparation

This application requires several pre-deployment set ups. In order to promote instant provision and ensure a consistent dependencies and deployment, AWS cloud virtual machine (EC2) will be used to run docker for all necessary pre-deployment build. 

### 4.1 Setting up virtual machine

To set up EC2 instance follow this workflow:
1. Login to AWS console, and then access "EC2" resource in Service bar.
2. Once EC2 dashboard is fully rendered, click "Launch Instance"
3. Provide name to label EC2 Instance
4. Select the desired amazon machine image (AMI) to build the virtual machine, in this project "Ubuntu Server 22.04 LTS (HVM)" image is selected.
5. Select the type of image architecture, in this project "64bit(x86)" is selected.
6. Select instance type, in this project "t3.2xlarge" is selected. This instance type caters to 8 vCPU and 32 GiB Memory.
7. Create new key pair to login, in this project ".pem" file is created.
8. Configure security group to network setting depending on the use case, in this project only SSH traffic from anywhere is allowed as default.
9. Lastly, configure storage to be provisioned, in this project 100 GiB gp2 is selected. Finally click launch instance.
10. Once has been launched, EC2 can be access using SSH protocol via Public IPv4 address
```
chmod 400 <pem_file_name>.pem
ssh -i <pem_file_name>.pem ubuntu@<ipv4_address>
```
11. Once set up, you can download this repository into your EC2 instance.
```
git clone https://github.com/RevoU-FSSE-2/week-8-gkorompis
cd week-8-gkorompis
```

### 4.2 Setting up other dependencies

In this project, docker only will be used to build and create mongodb collection. Therefore Node.js and npm must be installed in your working enviroment. Instructions to set up can follow the official documentation from both services.

### 4.3 Build mongodb collection

1. Direct to dockerfile directory, and then build image
```
cd ~/workflow/BuildMongoDB
docker build . -t mongodb-collection:1.0
```
2. Run the image
```
docker run -p 3001:3001 mongodb-collection:1.0
```
Once the container starts running, it will create "transactions" collection that in this project will be used to store any data related to transactions process.


## 5. Server-side Build and Deployment
Server side involves, transpiling typescript files into javascript and then compress the whole script together with node_modules into a zip file. This zip file is necessary to deploy express api routes using AWS lambda and AWS API Gateway.

### 5.1 Transpiling typescript and preparing deployment build

1. Install all necessary npm package.
```
# assuming you git clone the repository into your user's home directory (~). 
cd ~/week-8-gkorompis/server
npm install
```
2. Transpile all transcript files into javascript
```
cd ~/week-8-gkorompis/server/src
# as set up in tsconfig, the output directory will be located in parent directory relative to tsconfig file.
npx tsc
```
3. Compress the whole server directory contents that are needed to run a functional express api routes
```
cd ~/week-8-gkorompis/server
chmod 777 ../workflow/aws_lambda_deployment.sh
../workflow/aws_lambda_deployment.sh
```

### 5.2 Deploying build into AWS Lambda and AWS API Gateway

1. After login to you AWS console, direct to AWS lambda resource.
<img width="1397" alt="5 2 1" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/7bf72478-294b-4c18-bd92-e597ebd539e5">

2. Click "Create function", name your function and then "Create function" again.
<img width="1397" alt="5 2 2" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/37aa690d-7ac8-41f8-872e-5fa2cf21d232">

3. Direct to your newly created function, select option "Upload From", and then select ".zip file".
<img width="1354" alt="5 2 3" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/d7854c02-5765-449b-a902-4bdcb15d3c98">

4. Upload the zip file from previous step into aws lambda placeholder.
5. After that, direct to AWS API Gateway resource from menubar or concole.
6. Click "Create API", choose api type "REST API" (not private), and the click "Build".
7. After naming your API, click "create api", and then create resource.
<img width="1415" alt="5 2 7 1" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/2e8492a6-cd95-43c8-8128-391ca9f0c852">
<img width="1399" alt="5 2 7" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/f0e23551-773e-403b-a8bf-89a08abde5d6">

8. Tick configure as proxy resource, as well as enable API Gateway CORS, and then click "Create resource".
<img width="1400" alt="5 2 8" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/b4068d81-a82f-4f33-afb1-3ff8f6fa491e">

9. Connect API Gateway with your lambda function by typing your function name, and then click "Save".
<img width="1399" alt="5 2 9" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/306b103a-e482-40b5-8631-145275070648">

10. You can test your api, if all good, then click "Actions", and then "Deploy Api"
<img width="1404" alt="5 2 10" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/9836152b-f07b-4050-b7c7-ef8462726e09">

11. After naming your API deployment stage, and then click "Deploy"
<img width="1395" alt="5 2 11" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/28f9876a-4609-47b9-a8c9-001cba41f22a">

12. Your Base URL is ready, usually will be appeared on the top of the page.


## 6. Client-side Build and Deployment
