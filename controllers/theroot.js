const handleTheRoot = (req, res, db) => {
	db.select('*')
		.from('users')
		.then(users => {
			if (users.length) {
				res.json(users)
			} else {
				res.status(400).json('No Users Found')
			}
		})
		.catch(err => res.status(400).json('Error getting Users'))	
}

module.exports = {
	handleTheRoot: handleTheRoot
};

