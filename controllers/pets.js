const fs = require('fs');
const path = require('path');

module.exports = {
    create (req, res, next) {
        const petId = req.body.id;
        const newPet = req.body;
        // get all the file names of the users - fs.readdir - array
        // use includes or something similar to check if owner name exists in what user has requested.
        // if owner is there, carry on with the function
        // if not throw an error msg
        
        fs.readdir(path.resolve('data/owners'), function (err, data) {
            if (err) return next(err);
            const ownerFile = `${newPet.owner}.json`;
            if (data.includes(ownerFile)) {
                fs.writeFile(`./data/pets/${petId}.json`, JSON.stringify(newPet), function (err) {
                    if (err) return next(err);

                    return res.status(201).send({ pet: newPet});
                });
            }

            return next({
                "status": 404,
                "message": `Owner ID ${newPet.owner} does not exist, please create owner first`
            });
        });

    },

    fetchAll(req, res) {
        let response = '';
        const pets = fs.readdirSync('./data/pets/', 'utf8');

        if (req.query.owner) {
            pets.forEach(function (petFile) {
                let eachOwner = JSON.parse(fs.readFileSync(`./data/pets/${petFile}`)).owner;
                if (req.query.owner === eachOwner) {
                    response += fs.readFileSync(`./data/pets/${petFile}`);
                    return res.status(200).send(response);
                }
            });

            pets.forEach(function (petFile) {
                response += fs.readFileSync(`./data/pets/${petFile}`);
            });
            return res.status(200).send(response);
        }
    },

    fetchById (req, res, next) {
        const petId = req.params.id;

        fs.readFile(`./data/pets/${petId}.json`, function (err, data) {
            if (err) return next({ status: 404, message: `Pet with the ID of ${petId} cannot be found` });
            return res.status(200).send(data);
        });
    },

    updateById(req, res) {
        const PetId = req.params.id;
        const updatedPet = req.body;
        fs.writeFile(`./data/pets/${PetId}.json`, JSON.stringify(updatedPet), function (err) {
            if (err) return err;
            return res.status(200).send({
                pet: updatedPet
            });
        });
    },

    deleteById(req, res) {
        const PetId = req.params.id;
        fs.unlink(`./data/pets/${PetId}.json`, function (err) {
            if (err) return err;
        });
        return res.status(200).send(`Pet ID ${PetId} has been deleted`);
    }
}; 