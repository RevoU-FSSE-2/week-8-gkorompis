"use strict";
console.log("ts: transactions");
// Add New Transactions ---------------------------------------------------------------------------------
// button new transaction handler
const newTransactionButtonHandler = (event) => {
    let boardModalContainer = document.getElementById('board-modal-container');
    boardModalContainer === null || boardModalContainer === void 0 ? void 0 : boardModalContainer.classList.toggle("board-modal-container-hide");
    let boardModal = document.getElementById('section-service-board-modal');
    boardModal === null || boardModal === void 0 ? void 0 : boardModal.classList.toggle("board-modal-blur-background");
};
// add event listener to button new transaction
const newTransactionButton = document.getElementById("btn-new-transaction");
newTransactionButton === null || newTransactionButton === void 0 ? void 0 : newTransactionButton.addEventListener('click', newTransactionButtonHandler);
const postNewTransaction = () => {
    // let contentEmpty = document.getElementById('content-empty');
    // if(contentEmpty){
    //     document.getElementById('board-content-new-record')?.replaceChildren()
    //     console.log('element inner is cleaned')
    // }
    let payload = {};
    let formRequestAmount = document.getElementById('form-request-amount');
    payload.transactionAmount = Number(formRequestAmount === null || formRequestAmount === void 0 ? void 0 : formRequestAmount.value);
    let formRequestDate = document.getElementById('form-request-date');
    payload.transactionDate = formRequestDate === null || formRequestDate === void 0 ? void 0 : formRequestDate.value;
    let formRequestWallet = document.getElementById('form-request-wallet');
    payload.transactionWallet = formRequestWallet === null || formRequestWallet === void 0 ? void 0 : formRequestWallet.options[formRequestWallet.selectedIndex].value;
    let formRequestPocket = document.getElementById('form-request-pocket');
    payload.transactionPocket = formRequestPocket === null || formRequestPocket === void 0 ? void 0 : formRequestPocket.options[formRequestPocket.selectedIndex].value;
    let formRequestTag = document.getElementById('form-request-tag');
    payload.transactionTag = formRequestTag === null || formRequestTag === void 0 ? void 0 : formRequestTag.value;
    let formRequestDetails = document.getElementById('form-request-details');
    payload.transactionDetails = formRequestDetails === null || formRequestDetails === void 0 ? void 0 : formRequestDetails.value;
    // alert(`New Transaction ${payload.transactionDate}: ${payload.transactionAmount} has been submitted`);
    console.log(">>>payload", payload);
    return payload;
};
const addTransactionCards = () => {
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
        }];
    let boardCardTransactions = document.getElementById('board-card-transactions');
    // console.log(">>>board card transactions", boardCardTransactions);
    boardCardTransactions === null || boardCardTransactions === void 0 ? void 0 : boardCardTransactions.replaceChildren();
    payloads.map(payload => {
        var _a;
        // append element
        let cardContainer = document.createElement('div');
        cardContainer.setAttribute('class', 'card-container');
        let cardSpan = document.createElement('div');
        cardSpan.setAttribute('class', 'card-span');
        let newCard = document.createElement('div');
        newCard.setAttribute('class', 'record-card');
        let cardTitle = document.createElement('h4');
        let cardCount = (_a = document.querySelector('.board-content-container')) === null || _a === void 0 ? void 0 : _a.children.length;
        let transactionAmount = document.createElement('p');
        transactionAmount.innerText = `Transaction Owner: ${payload.transactionAmount}`;
        let transactionDate = document.createElement('p');
        transactionDate.innerText = `Transaction Type: ${payload.transactionDate}`;
        let transactionWallet = document.createElement('p');
        transactionWallet.innerText = `Amount: ${payload.transactionWallet}`;
        let transactionPocket = document.createElement('p');
        transactionPocket.innerText = `Pocket: ${payload.transactionPocket}`;
        let transactionTag = document.createElement('p');
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
        cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.appendChild(cardSpan);
        cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.appendChild(newCard);
        boardCardTransactions === null || boardCardTransactions === void 0 ? void 0 : boardCardTransactions.appendChild(cardContainer);
        // console.log('>>list transactions', boardCardTransactions);
    });
};
const submitTransactionButtonHandler = (event) => {
    console.log('submit');
    let boardModalContainer = document.getElementById('board-modal-container');
    boardModalContainer === null || boardModalContainer === void 0 ? void 0 : boardModalContainer.classList.toggle("board-modal-container-hide");
    let boardModal = document.getElementById('section-service-board-modal');
    boardModal === null || boardModal === void 0 ? void 0 : boardModal.classList.toggle("board-modal-blur-background");
    postNewTransaction();
    addTransactionCards();
};
// add event listener to button submit new transaction
const submitAssetButton = document.getElementById("btn-submit-asset");
submitAssetButton === null || submitAssetButton === void 0 ? void 0 : submitAssetButton.addEventListener('click', submitTransactionButtonHandler);
