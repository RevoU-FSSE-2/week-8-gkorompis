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



//Submit New Transaction ---------------------------------------------------------------------------------
interface NewTransactionPayload {
   transactionAmount?: Number;
   transactionDate?: String;
   transactionWallet?: String;
   transactionPocket?: String;
   transactionTag?: String;
   transactionDetails?: String;
}
const postNewTransaction=()=>{
    // let contentEmpty = document.getElementById('content-empty');
    // if(contentEmpty){
    //     document.getElementById('board-content-new-record')?.replaceChildren()
    //     console.log('element inner is cleaned')
    // }
    let payload = <NewTransactionPayload> {};
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
const addTransactionCards = () =>{
    //get payloads
    const payloads = [{
        transactionAmount: 100000,
        transactionDate: '01-01-1996',
        transactionWallet: "Monthly Income",
        transactionPocket: "Entertainment",
        transactionTag: "Netflix",
        transactionDetails: "",
    },
    {
        transactionAmount: 524000,
        transactionDate: '01-01-1996',
        transactionWallet: "Monthly Income",
        transactionPocket: "Entertainment",
        transactionTag: "Netflix",
        transactionDetails: "",
    }]
    let boardCardTransactions = document.getElementById('board-card-transactions');
    // console.log(">>>board card transactions", boardCardTransactions);
    boardCardTransactions?.replaceChildren();
    
    payloads.map(payload =>{
        // append element
        let cardContainer = document.createElement('div');
        cardContainer.setAttribute('class','card-container');
        let cardSpan = document.createElement('div');
        cardSpan.setAttribute('class','card-span');
        let newCard = document.createElement('div');
        newCard.setAttribute('class','record-card');

        let cardTitle = document.createElement('h4');
        let cardCount = document.querySelector('.board-content-container')?.children.length
        let transactionAmount = document.createElement('p');
        transactionAmount.innerText = `Transaction Owner: ${payload.transactionAmount}`;
        let transactionDate = document.createElement('p');
        transactionDate.innerText = `Transaction Type: ${payload.transactionDate}`;
        let transactionWallet = document.createElement('p');
        transactionWallet.innerText = `Amount: ${payload.transactionWallet}`;
        let transactionPocket= document.createElement('p');
        transactionPocket.innerText = `Pocket: ${payload.transactionPocket}`;
        let transactionTag= document.createElement('p');
        transactionTag.innerText = `Tag: ${payload.transactionTag}`;
        let transactionDetails = document.createElement('p');
        transactionDetails.innerText = `Details: ${payload.transactionDetails}`;

        cardTitle.textContent = `Record #00-${Number(cardCount) + 1}`;
        newCard.appendChild(cardTitle);
        newCard.appendChild(transactionAmount);
        newCard.appendChild(transactionDate);
        newCard.appendChild(transactionWallet);
        newCard.appendChild(transactionPocket);
        newCard.appendChild(transactionTag);
        // console.log('>>new card', newCard);

        let boardCardTransactions = document.getElementById('board-card-transactions');
        cardContainer?.appendChild(cardSpan);
        cardContainer?.appendChild(newCard);
        boardCardTransactions?.appendChild(cardContainer);
        // console.log('>>list transactions', boardCardTransactions);

        }) 
};
const submitTransactionButtonHandler = (event: MouseEvent) => {
    console.log('submit')
    let boardModalContainer = document.getElementById('board-modal-container');
    boardModalContainer?.classList.toggle("board-modal-container-hide")
    let boardModal = document.getElementById('section-service-board-modal');
    boardModal?.classList.toggle("board-modal-blur-background");
    postNewTransaction();
    addTransactionCards();
};

// add event listener to button submit new transaction
const submitAssetButton = document.getElementById("btn-submit-asset");
submitAssetButton?.addEventListener('click', submitTransactionButtonHandler);