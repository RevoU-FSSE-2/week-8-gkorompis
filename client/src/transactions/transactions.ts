
// types
type NewTransactionPayload = {
    _id?: string,
    userId?: string;
    transactionAmount?: number;
    transactionDate?: string;
    transactionWallet?: string;
    transactionPocket?: string;
    transactionTag?: string;
    transactionDetails?: string;
};
type TransactionsPayload = NewTransactionPayload[]
type FetchFunction= () => Promise<TransactionsPayload | undefined>
type FetchPostfunction<T> = (data:NewTransactionPayload) => Promise<T>
// type FetchFunction= () => Promise<TransactionsPayload | undefined>

console.log("ts: transactions");
// Add New Transactions ---------------------------------------------------------------------------------
// button new transaction handler
const newTransactionButtonHandler = (event: MouseEvent) => {
    let boardModalContainer = document.getElementById('board-modal-container');
    boardModalContainer?.classList.toggle("board-modal-container-hide")
    let boardModal = document.getElementById('section-service-board-modal');
    boardModal?.classList.toggle("board-modal-blur-background");
};


// add event listener to button new transaction
const newTransactionButton = document.getElementById("btn-new-transaction");
newTransactionButton?.addEventListener('click', newTransactionButtonHandler);



//Post & Submit New Transaction ---------------------------------------------------------------------------------
const postNewTransaction=(userId:string)=>{
    let payload = <NewTransactionPayload> {};
    payload.userId = userId || "graciak"
    let formRequestAmount = document.getElementById('form-request-amount') as HTMLInputElement | null;
    payload.transactionAmount = Number(formRequestAmount?.value); 
    let formRequestDate = document.getElementById('form-request-date') as HTMLSelectElement | null;
    payload.transactionDate = formRequestDate?.value;
    let formRequestWallet = document.getElementById('form-request-wallet') as HTMLSelectElement | null;
    payload.transactionWallet = formRequestWallet?.options[formRequestWallet.selectedIndex].value;
    let formRequestPocket = document.getElementById('form-request-pocket') as HTMLSelectElement | null;
    payload.transactionPocket = formRequestPocket?.options[formRequestPocket.selectedIndex].value;
    let formRequestTag= document.getElementById('form-request-tag') as HTMLInputElement | null;
    payload.transactionTag= formRequestTag?.value;
    let formRequestDetails= document.getElementById('form-request-details') as HTMLInputElement | null;
    payload.transactionDetails= formRequestDetails?.value;
    
    // alert(`New Transaction ${payload.transactionDate}: ${payload.transactionAmount} has been submitted`);
    console.log(">>>payload", payload)
    return payload;
};



const fetchPostTransaction:FetchPostfunction<void> = async (data:NewTransactionPayload) =>{
  fetch('https://2oztga8zl7.execute-api.ap-southeast-3.amazonaws.com/dev/transactions?bearer=<foo>', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    console.log('fecth post')
    if (response.status === 201) {
        console.log(">>>",{response})
        return response.json();
    } else {
        console.log('fetch error')
        throw new Error('Error creating post');
    }
  }).then(data => {
    console.log(">>datadata", data)
    // let boardModalContainer = document.getElementById('board-modal-container');
    // boardModalContainer?.classList.toggle("board-modal-container-hide")
    let boardModal = document.getElementById('section-service-board-modal');
    boardModal?.classList.toggle("board-modal-blur-background");
    document.location.reload();
  }).catch(error => {
      // alert(error.message);
      console.log(error)
      document.location.reload();
  });
};
const submitTransactionButtonHandler = async (event: MouseEvent) => {
    console.log('submit')
    let boardModalContainer = document.getElementById('board-modal-container');
    boardModalContainer?.classList.toggle("board-modal-container-hide")
    // let boardModal = document.getElementById('section-service-board-modal');
    // boardModal?.classList.toggle("board-modal-blur-background");
    const postBody = postNewTransaction('gkorompis');
    console.log({postBody})
    await fetchPostTransaction(postBody);
};

// add event listener to button submit new transaction
const submitAssetButton = document.getElementById("btn-submit-asset");
submitAssetButton?.addEventListener('click', submitTransactionButtonHandler);


//Get List of Transactions ---------------------------------------------------------------------------------
const addTransactionCards = (payloads:TransactionsPayload | undefined) =>{
    //get payloads
    console.log(">>>adding cards")
    const test = [{
        transactionAmount: 100000,
        transactionDate: '01-01-1996',
        transactionWallet: "Monthly Income",
        transactionPocket: "Entertainment",
        transactionTag: "Netflix",
        transactionDetails: "",
    }]
    const listTransactions = payloads || test;
    let boardCardTransactions = document.getElementById('board-card-transactions');
    // console.log(">>>board card transactions", boardCardTransactions);
    boardCardTransactions?.replaceChildren();
    if(listTransactions){
        payloads?.map(payload =>{
        // append element
        let cardContainer = document.createElement('div');
        cardContainer.setAttribute('class','card-container');
        let cardSpan = document.createElement('div');
        cardSpan.setAttribute('class','card-span');
        let newCard = document.createElement('div');
        newCard.setAttribute('class','record-card');
        let cardTitle = document.createElement('h4');
        let cardCount = payload._id ||document.querySelector('.board-content-container')?.children.length
        let transactionAmount = document.createElement('p');
        transactionAmount.innerText = `Transaction Amount: ${payload.transactionAmount}`;
        let transactionDate = document.createElement('p');
        transactionDate.innerText = `Transaction Date: ${payload.transactionDate}`;
        let transactionWallet = document.createElement('p');
        transactionWallet.innerText = `Wallet: ${payload.transactionWallet}`;
        let transactionPocket= document.createElement('p');
        transactionPocket.innerText = `Pocket: ${payload.transactionPocket}`;
        let transactionTag= document.createElement('p');
        transactionTag.innerText = `Tag: ${payload.transactionTag}`;
        let transactionDetails = document.createElement('p');
        transactionDetails.innerText = `Details: ${payload.transactionDetails}`;
        cardTitle.textContent = `Record #00-${cardCount}`;
        newCard.appendChild(cardTitle);
        newCard.appendChild(transactionAmount);
        newCard.appendChild(transactionDate);
        newCard.appendChild(transactionWallet);
        newCard.appendChild(transactionPocket);
        newCard.appendChild(transactionTag);
        newCard.appendChild(transactionDetails);
        // console.log('>>new card', newCard);

        let boardCardTransactions = document.getElementById('board-card-transactions');
        cardContainer?.appendChild(cardSpan);
        cardContainer?.appendChild(newCard);
        boardCardTransactions?.appendChild(cardContainer);
        // console.log('>>list transactions', boardCardTransactions);
        }) 
    }  
};
const fetchTransactions:FetchFunction = async ()=>{
console.log(">>>fetching")
  try {
    // Make a GET request using fetch
    const response = await fetch('https://2oztga8zl7.execute-api.ap-southeast-3.amazonaws.com/dev/transactions?bearer=<foo>');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data:TransactionsPayload = await response.json();
    console.log('Response:', data);
    console.log('test')
    return data as NewTransactionPayload[];
  } catch (error) {
    return []
  }
}
fetchTransactions().then(transactions =>{
    console.log({transactions});
    addTransactionCards(transactions);
})


