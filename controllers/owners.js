const fs = require('fs');

module.exports = {
    create(req, res) {
        const ownerId = req.body.id;
        const newOwner = req.body;

        fs.writeFile(`./data/owners/${ownerId}.json`, JSON.stringify(newOwner), function (err) {
            if (err) return err;
            return res.status(200).send({
                owner: newOwner
            });
        });
    },


    fetchAll (req, res) {
        let response = '';

        fs.readdirSync('./data/owners/', 'utf8')
            .forEach(function (file) {
                response += fs.readFileSync(`./data/owners/${file}`);
            });
        return res.status(200).send(response);
    },

    fetchById (req, res, next) {
        const owner = req.params.id;
        fs.readFile(`./data/owners/${owner}.json`, function (err, data) {
                    if (err) return next ({
                        "status": 404,
                        "message": `Owner ID ${owner} does not exist` 
                    });

                    return res.status(200).send(data);
        });
    },

    updateById(req, res) {
        const ownerId = req.params.id;
        const updatedOwner = req.body;
        fs.writeFile(`./data/owners/${ownerId}.json`, JSON.stringify(updatedOwner), function (err) {
            if (err) return err;
            return res.status(200).send({
                owner: updatedOwner
            });
        });
    },

    deleteById(req, res, next) {
        const ownerIdToDelete = req.params.id;
        const pets = fs.readdirSync('./data/pets/', 'utf8');

        fs.readFile(`./data/owners/${ownerIdToDelete}.json`, function (err) {
            if (err) {
                return next({ "status": 404, "message": `Owner ID ${ownerIdToDelete} does not exist :(`});
            } else {

            fs.unlink(`./data/owners/${ownerIdToDelete}.json`, function (err) {
                if (err) return err;
            });

            pets.filter(function (pet) {
            let owner = JSON.parse(fs.readFileSync(`./data/pets/${pet}`)).owner;
                if (req.params.id === owner) {
                    fs.unlink(`./data/pets/${pet}`, function (err) {
                        if (err) return err;
                    });
                }
            });
                return res.status(200).send(`Owner ID ${ownerIdToDelete} has been deleted along with their pets`);
            }
        });
    }
};