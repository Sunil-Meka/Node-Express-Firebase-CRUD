const { firestore } = require("firebase-admin");
const { admin, db } = require("../../utils/admin");

class Model {
  async _createUser(inputs) {
    return admin
      .auth()
      .createUser({ email: inputs.email, password: inputs.password })
      .then((user) => {
        const userRef = db.collection("USERS").doc(user.uid);
        const userInfo = {};
        Object.entries(inputs).forEach(([key, value]) => {
          if (key !== "password") {
            userInfo[key] = value;
          }
        });
        return userRef.set({
          ...userInfo,
          createdAt: firestore.FieldValue.serverTimestamp(),
		  id:userRef.id
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  async _getUser(id) {
    return db
      .collection("USERS")
      .doc(id)
      .get()
      .then((user) => {
        console.log(user.data());
        return user.data();
      })
      .catch((err) => {
        throw err;
      });
  }

  async _getUsers() {
    return db
      .collection("USERS")
      .get()
      .then((users) => {
        let usersInfo = [];
        users.forEach((user) => {
          usersInfo.push({
            ...user.data(),
          });
        });
        return usersInfo;
      })
      .catch((err) => {
        throw err;
      });
  }

  async _updateUser(id, inputs) {
    return db
      .collection("USERS")
      .doc(id)
      .update(inputs)
      .then(() => {
        return true;
      })
      .catch((err) => {
        throw err;
      });
  }

  async _deleteUser(id){
	  return db.collection('USERS').doc(id).update({isActive:false}).then(()=>{
		  return true
	  }).catch((err)=>{
		  throw err
	  })
  }

}
module.exports = Model;
