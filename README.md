# [How Much?](https://64d639a9ff6c0b67556ba24b--stellar-gaufre-002876.netlify.app/) A Node JS & Typescript Project for Financial Management Application

<img width="1397" alt="hm-home" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/d39ed479-840e-4200-8dec-60ab5fad188d">

## 1. Introduction

[How Much?](https://64d639a9ff6c0b67556ba24b--stellar-gaufre-002876.netlify.app/) is a user-friendly Finance App designed to help you track your cash flow effectively. It offers a simple and intuitive interface to record your income and expenses, providing you with valuable insights into your financial habits.

<img width="1398" alt="hm-navbar" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/ebe0da6c-6faa-4f48-8140-5642b4124121">


## 2. Documentation Contents

1. Introduction
2. Documentation Contents
3. Application Overview: Main Feature, Dependencies, and API Documentation
4. Cloud-computing Preparation
5. Server-side Build and Deployment
6. Client-side Build and Deployment


## 3. Application Overview

### 3.1 Main Feature
Tracking Transactions: allow to keep tracking your spending, and give visual projection how much money remains in your customized wallet.

<img width="1385" alt="hm-transactions" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/503de841-b11f-444a-8d4c-46df5d1a7459">

<img width="1379" alt="hm-form" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/24b6ee78-694b-45f5-8517-29a4b4655334">

### 3.2 Dependencies
The client-side application is hosted by netlify, while the server-side application is hosted by AWS API Gateway. This client-side application requires:
* HTML: The standard markup language for creating the structure of the app's user interface.
* CSS: Cascading Style Sheets for styling the app and ensuring a visually appealing user experience.
* TypeScript: A superset of JavaScript, used for DOM manipulation and managing the application's logic.

And server-side application requires:
```javascript
"dependencies": {
   "@types/body-parser": "^1.19.2",
   "@types/cors": "^2.8.13",
   "@types/express": "^4.17.17",
   "body-parser": "^1.20.2",
   "cors": "^2.8.5",
   "dotenv": "^16.3.1",
   "express": "^4.18.2",
   "mongodb": "^5.7.0",
   "serverless-http": "^3.2.0",
   "typescript": "^5.1.6"
}
```

### 3.3 API Documentation
```http
<base URL>/<resource>?bearer=<api_token>
```

1. BaseURL
```http
https://2oztga8zl7.execute-api.ap-southeast-3.amazonaws.com/prod
```

2. RESOURCES

| Resource       | Status | Description                          | Fields        |
| :------------- | :----- | :----------------------------------- | :------------ |
| **transactions** | `prod` | Collection of transaction records   | `{_id, userId, transactionAmount, transactionDate, transactionWallet, transactionPocket, transactionTag, transactionDetails}`            |
| **users**        | `dev`  | Collection of user profiles         | None          |
| **wallets**      | `dev`  | Collection of wallet information    | None          |
| **pockets**      | `dev`  | Collection of pocket data           | None          |
| **statistics**   | `dev`  | Collection of finance statistics   | None          |

all resources under `dev` are still in progress development and not ready for staging or public access.

3. ENDPOINTS

##### GET Fetch Many Document: Endpoint
```http
GET /transactions/?bearer=<your_api_token>
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `bearer` | `string` | **Required**. Your API Token |

##### Fetch Many Document: Response
```javascript
[
    {
        "userId": string,
        "transactionAmount": number,
        "transactionDate": string,
        "transactionWallet": string,
        "transactionPocket": string,
        "transactionTag": string,
        "transactionDetails": string,
    }, 
    // ...
]
```

##### GET Fetch One Document: Endpoint

```http
GET /transactions/<transaction_id>?bearer=<your_api_token>
```

| Parameter/Query | Type | Description |
| :--- | :--- | :--- |
| `transaction_id` | `string` | **Required**. Unique string for every transaction record |
| `bearer` | `string` | **Required**. Your API Token |

##### Fetch One Document: Response
```javascript
{
    "userId": string,
    "transactionAmount": number,
    "transactionDate": string,
    "transactionWallet": string,
    "transactionPocket": string,
    "transactionTag": string,
    "transactionDetails": string,
}
```

##### POST Insert One Document: Endpoint

```http
POST /transactions?bearer=<your_api_token>
```

| Parameter/Query | Type | Description |
| :--- | :--- | :--- |
| `bearer` | `string` | **Required**. Your API Token |

##### Insert One Document: Request Body
```javascript
{
    "userId": string,
    "transactionAmount": number,
    "transactionDate": string,
    "transactionWallet": string,
    "transactionPocket": string,
    "transactionTag": string,
    "transactionDetails": string,
}
```

##### PUT/PATCH Update One Document: Endpoint

```http
PUT /transactions/<transaction_id>?bearer=<your_api_token>
```

| Parameter/Query | Type | Description |
| :--- | :--- | :--- |
| `transaction_id` | `string` | **Required**. Unique string for every transaction record |
| `bearer` | `string` | **Required**. Your API Token |

##### Update One Document: Document
```javascript
{
    "userId"?: string,
    "transactionAmount"?: number,
    "transactionDate"?: string,
    "transactionWallet"?: string,
    "transactionPocket"?: string,
    "transactionTag"?: string,
    "transactionDetails"?: string,
}
```

##### 5. DELETE Remove One Document: Endpoint

```http
PUT /transactions/<transaction_id>?bearer=<your_api_token>
```

| Parameter/Query | Type | Description |
| :--- | :--- | :--- |
| `transaction_id` | `string` | **Required**. Unique string for every transaction record |
| `bearer` | `string` | **Required**. Your API Token |

##### Remove One Document: Request Body
```javascript
// no request body is required
```

4. SUMMARY

| Route         | Endpoint             | UniqueID               | Authentication      | Header        | Request Body       | Response Description             |
| :------------ | :------------------- | :--------------------- | :------------------ | :------------ | :----------------- | :-------------------------------- |
| GET many      | /transactions        | -                     | **Required**. bearer | -            | -                 | Array of transaction documents   |
| GET one       | /transactions/{id}   | **Required**. `id`     | **Required**. bearer | -            | -                 | Single transaction document       |
| POST one      | /transactions        | -                     | **Required**. bearer | -            | **Required**. JSON | Status of the POST operation      |
| PUT one       | /transactions/{id}   | **Required**. `id`     | **Required**. bearer | -            | **Required**. JSON | Status of the PUT operation       |
| PATCH one     | /transactions/{id}   | **Required**. `id`     | **Required**. bearer | -            | **Required**. JSON | Status of the PATCH operation     |
| Delete one    | /transactions/{id}   | **Required**. `id`     | **Required**. bearer | -            | -                 | Status of the DELETE operation    |

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
<img width="1397" alt="5 2 1" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/8ccfb003-6f99-48bc-bb46-5493a9b79c91">

2. Click "Create function", name your function and then "Create function" again.
<img width="1397" alt="5 2 2" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/f348631d-2439-439d-85ee-78208557a665">

3. Direct to your newly created function, select option "Upload From", and then select ".zip file".
<img width="1354" alt="5 2 3" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/d8606751-b48b-42c0-b417-30cf6c7469f5">

4. Upload the zip file from previous step into aws lambda placeholder.
5. After that, direct to AWS API Gateway resource from menubar or concole.
6. Click "Create API", choose api type "REST API" (not private), and the click "Build".
7. After naming your API, click "create api", and then create resource.
<img width="1415" alt="5 2 7 1" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/4e0109c7-39b2-4a6e-af29-26c078d9e179">

<img width="1399" alt="5 2 7" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/ef62dfbc-1483-4ccc-b369-e9c16cf6f4c0">

8. Tick configure as proxy resource, as well as enable API Gateway CORS, and then click "Create resource".
<img width="1400" alt="5 2 8" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/c8e6a2be-ae0f-472e-bdba-00ad63dae675">

9. Connect API Gateway with your lambda function by typing your function name, and then click "Save".
<img width="1399" alt="5 2 9" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/0007f388-aec8-438c-ba49-a0c118a5181e">

10. You can test your api, if all good, then click "Actions", and then "Deploy Api"
<img width="1404" alt="5 2 10" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/97df6514-b7ea-4fa5-b05b-5c71bf5494db">

11. After naming your API deployment stage, and then click "Deploy"
<img width="1395" alt="5 2 11" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/7cd54f2b-9eab-4592-a726-7adcc4ab31be">

12. Your Base URL is ready, usually will be appeared on the top of the page.


## 6. Client-side Build and Deployment
Deployment is achieved by following these simple steps:
1. Compress client-side directory containing all the frontend files
2. Drag and drop to netfliy
3. Deploy