import { Request, Response, NextFunction } from 'express';

const pool = require('../config').pool;

function testAPI(req: Request, res: Response) {
    res.json({
        message: 'Hello',
    });
}

// const getPositions = (req: Request, res: Response) => {
//     const qText = 'SELECT $1 FROM Positions';
//     const qValues = 'pID';
//     try {
//         const res = await pool.query(qText, qValues);
//         console.log(res.rows[0]);
//         res.status(200).json(res.rows);
//     } catch (err: unknown) {
//         console.log(err);
//     }
// }

async function getPositions(req: Request, res: Response) {
    const qText = 'SELECT $1 FROM Positions';
    const qValues = 'pID';
    try {
        const res = await pool.query(qText, qValues);
        console.log(res.rows[0]);
        res.status(200).json(res.rows);
    } catch (err: unknown) {
        console.log(err);
    }
}


// const addBook = (request, response) => {
//     const { author, title } = request.body
//
//     pool.query(
//         'INSERT INTO books (author, title) VALUES ($1, $2)',
//         [author, title],
//         (error) => {
//             if (error) {
//                 throw error
//             }
//             response.status(201).json({ status: 'success', message: 'Book added.' })
//         }
//     )
// }
//
// app
//     .route('/books')
//     // GET endpoint
//     .get(getBooks)
//     // POST endpoint
//     .post(addBook)
//
// // Start server
// app.listen(process.env.PORT || 3002, () => {
//     console.log(`Server listening`)
// })



export {testAPI, getPositions};