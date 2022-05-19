const { firestore } = require("firebase-admin");
const { admin, db } = require("../../utils/admin");

class Model{
	async _createUser(inputs){
		return admin.auth().createUser({email:inputs.email,password:inputs.password}).then((user)=>{
			const userRef = db.collection('USERS').doc(user.uid)
			const userInfo = {}
			Object.entries(inputs).forEach(([key,value])=>{
				if(key!=="password"){
					userInfo[key]=value
				}
			})
			return userRef.set({
				...userInfo,
				createdAt: firestore.FieldValue.serverTimestamp()
			})
		}).catch((err)=>{
			throw err
		})
	}
}
module.exports = Model