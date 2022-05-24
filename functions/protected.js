const { admin } = require("./utils/admin")

const protected = (req,res,next) =>{
	if(req.headers.authorization){
		const token = req.headers.authorization.split(" ")[1]
		console.log(token)
		return admin.auth().verifyIdToken(token).then((decodedToken)=>{
			console.log(decodedToken)
			const {uid} = decodedToken
			return admin.firestore().collection('USERS').doc(uid).get().then((user)=>{
				if(user.exists){
					console.log(user.data())
					req.user = user.data()
					return next()
				}
				else{
					return res.status(401).json({message:`no user found`})
				}
			})
		}).catch((err)=>{
			return res.status(400).json({message:`Invalid token`})
		})
	}
	return res.status(409).json({message:`Unauthorized access`})
}

module.exports = protected