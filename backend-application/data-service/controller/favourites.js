const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../files/users.favourites.txt')

const readFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        writeFile({})
    }
};

const writeFile = (content) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(content));
        // file written successfully
    } catch (err) {
        console.error(err);
    }
};

readFile();

const favouritesControllers = {
    get: async (req, res) => {
        const data = readFile() || {};
        const {userId} = req.query;
        res.send({ success: true, favourites: data[userId] || []})
    },
    add: async (req, res) => {
        const data = readFile() || {};
        const {userId, saleId} = req.body;

        const content = {...data, [userId]: [...(data[userId] || []), saleId]};
        writeFile(content)

        res.send({ success: true})
    },
    remove: async (req, res) => {
        const data = readFile() || {};
        const {userId, saleId} = req.query;
        const content = {...data, [userId]: [...(data[userId] || []).filter((del) => del !== saleId)]};
        writeFile(content)
        res.send({ success: true})
    }
};
module.exports = favouritesControllers;
