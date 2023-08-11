"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// type FetchFunction= () => Promise<TransactionsPayload | undefined>
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
//Post & Submit New Transaction ---------------------------------------------------------------------------------
const postNewTransaction = (userId) => {
    let payload = {};
    payload.userId = userId || "graciak";
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
const fetchPostTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    fetch('https://2oztga8zl7.execute-api.ap-southeast-3.amazonaws.com/dev/transactions?bearer=1cf206f8-aca8-46d8-8b80-f5d5e287a4c1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log('fecth post');
        if (response.status === 201) {
            console.log(">>>", { response });
            return response.json();
        }
        else {
            console.log('fetch error');
            throw new Error('Error creating post');
        }
    }).then(data => {
        console.log(">>datadata", data);
        // let boardModalContainer = document.getElementById('board-modal-container');
        // boardModalContainer?.classList.toggle("board-modal-container-hide")
        let boardModal = document.getElementById('section-service-board-modal');
        boardModal === null || boardModal === void 0 ? void 0 : boardModal.classList.toggle("board-modal-blur-background");
        document.location.reload();
    }).catch(error => {
        // alert(error.message);
        console.log(error);
        document.location.reload();
    });
});
const submitTransactionButtonHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('submit');
    let boardModalContainer = document.getElementById('board-modal-container');
    boardModalContainer === null || boardModalContainer === void 0 ? void 0 : boardModalContainer.classList.toggle("board-modal-container-hide");
    // let boardModal = document.getElementById('section-service-board-modal');
    // boardModal?.classList.toggle("board-modal-blur-background");
    const postBody = postNewTransaction('gkorompis');
    console.log({ postBody });
    yield fetchPostTransaction(postBody);
});
// add event listener to button submit new transaction
const submitAssetButton = document.getElementById("btn-submit-asset");
submitAssetButton === null || submitAssetButton === void 0 ? void 0 : submitAssetButton.addEventListener('click', submitTransactionButtonHandler);
//Get List of Transactions ---------------------------------------------------------------------------------
const addTransactionCards = (payloads) => {
    //get payloads
    console.log(">>>adding cards");
    const test = [{
            transactionAmount: 100000,
            transactionDate: '01-01-1996',
            transactionWallet: "Monthly Income",
            transactionPocket: "Entertainment",
            transactionTag: "Netflix",
            transactionDetails: "",
        }];
    const listTransactions = payloads || test;
    let boardCardTransactions = document.getElementById('board-card-transactions');
    // console.log(">>>board card transactions", boardCardTransactions);
    boardCardTransactions === null || boardCardTransactions === void 0 ? void 0 : boardCardTransactions.replaceChildren();
    if (listTransactions) {
        payloads === null || payloads === void 0 ? void 0 : payloads.map(payload => {
            var _a;
            // append element
            let cardContainer = document.createElement('div');
            cardContainer.setAttribute('class', 'card-container');
            let cardSpan = document.createElement('div');
            cardSpan.setAttribute('class', 'card-span');
            let newCard = document.createElement('div');
            newCard.setAttribute('class', 'record-card');
            let cardTitle = document.createElement('h4');
            let cardCount = payload._id || ((_a = document.querySelector('.board-content-container')) === null || _a === void 0 ? void 0 : _a.children.length);
            let transactionAmount = document.createElement('p');
            transactionAmount.innerText = `Transaction Amount: ${payload.transactionAmount}`;
            let transactionDate = document.createElement('p');
            transactionDate.innerText = `Transaction Date: ${payload.transactionDate}`;
            let transactionWallet = document.createElement('p');
            transactionWallet.innerText = `Wallet: ${payload.transactionWallet}`;
            let transactionPocket = document.createElement('p');
            transactionPocket.innerText = `Pocket: ${payload.transactionPocket}`;
            let transactionTag = document.createElement('p');
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
            cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.appendChild(cardSpan);
            cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.appendChild(newCard);
            boardCardTransactions === null || boardCardTransactions === void 0 ? void 0 : boardCardTransactions.appendChild(cardContainer);
            // console.log('>>list transactions', boardCardTransactions);
        });
    }
};
const fetchTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(">>>fetching");
    try {
        // Make a GET request using fetch
        const response = yield fetch('https://2oztga8zl7.execute-api.ap-southeast-3.amazonaws.com/dev/transactions?bearer=1cf206f8-aca8-46d8-8b80-f5d5e287a4c1');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = yield response.json();
        console.log('Response:', data);
        console.log('test');
        return data;
    }
    catch (error) {
        return [];
    }
});
fetchTransactions().then(transactions => {
    console.log({ transactions });
    addTransactionCards(transactions);
});
