const express = require('express');
const router = express.Router();
const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp({
    apiKey: 'AIzaSyB49_Ms7HYtRZhaKQZLz8An9G2EiBJoHto',
    projectId: 'survival-bot-c3864'
});
const db = firebase.firestore();





router.get('/expenses/get', (req, res) => {
    let data = [];

    db.collection('users').where('telegram_id', "==", 79475693).get()
        .then( usersSnapshot => {
            usersSnapshot.forEach(doc => {
               let userId = doc.id;

               db.collection('expenses').where('users', 'array-contains', userId).get()
                   .then(expensesSnapshot => {
                       expensesSnapshot.forEach(expense => {

                           let expenseUsers = [];
                           let expenseData = expense.data();
                           let createdBy = expenseData.created_by;

                            expenseData.users.forEach((user) => {
                               db.collection('users').doc(user).get()
                                   .then(userData => {

                                       expenseUsers.push(userData.data());
                                       if (userData.id == createdBy) {
                                           expenseData.created_by = userData.data();
                                       }
                                   })
                           });

                           expenseData.users = expenseUsers;

                           data.push(expenseData);
                       })

                       setTimeout(() => {
                           console.log(data.users)
                           res.status(200).json({
                               status: true,
                               data: data
                           })
                       }, 5000);
                   })
            })
        }
    )
});






module.exports = router;