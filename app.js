const express = require('express');
const db = require('./db');
const bodyPareser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyPareser.json());

db.connect((err) => {
    if (err) throw err;
    console.log('db connected');

})

app.get('./products', (req, res) => {
    const {
        currentPage = 1,
        pageSize = 10,
        orderBy = 'createdAt',
        orderDir = 'desc',
        searchBy = '',
        searchFields = []
    } = req.query;


const offset = (currentPage - 1) * pageSize;
let filterQuery = '';
let filterValue = [];

if (searchBy && searchField.length > 0) {
    filterQuery = (`WHERE ${searchField.map(field => `${field} LIKE ?`).join(' OR ')}`);
    filterValue = searchField.map(field => `%${searchBy}%`);
}

const countQuery = `SELECT COUNT(*) as totalcount FROM products ${filterQuery}`;
const fetchQuery = `SELECT * FROM products ${filterQuery} ORDER BY ${orderBy} ${orderDir}`;

db.connect(countQuery, filterValue, (err, countResult) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }

    console.log('db connected');
    const totalcount = countResult[0].totalcount;
    const totalpages = Math.ceil(totalcount / pageSize);


    db.query(fetchQuery, [...filterValue, offset, pagesize], (err, product) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Server error' });
        }
        console.log('db connected');

        res.json({
            currentPage: parseInt(currentPage),
            pagesize: parseInt(pageSize),
            totalpages,
            totalcount,
            data: products,
        })
    })
})
});
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});