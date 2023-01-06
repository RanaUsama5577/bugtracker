const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const dbf = admin.database();


exports.NewReportedBug =
    functions.database.ref("/ReportedBugs/{doc_id}")
        .onCreate((snapshot, context) => {
          let reportedBug = snapshot.val()
          console.log("context",context)
          console.log("snapshot",snapshot)
          let ContactInfo = reportedBug.ContactInfo
          let ShortDescr = reportedBug.ShortDescr
          let createdBugId = context.params.doc_id
          console.log("context.params   ",context.params)
          console.log("createdBugId   ",createdBugId)
          return db.collection("mail").doc().set({
              to:"developer1@company.hu",
              cc:ContactInfo,
              message:{
                  subject:"Lorem ipsum " +  createdBugId,
                  html:"Lorem ipsum " + ShortDescr,
              }
          })
          .then(function() {
                console.log("done")
            })
            .catch(function(error){
                console.log("error",error)
            })
        })

        

        