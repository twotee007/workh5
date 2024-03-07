import express from "express";
import {conn, mysql, queryAsync} from "../dbconn";
export const router = express.Router();

router.get("/", (req, res) => {
    const title = `%${req.query.title}%`;
    const queryString = `
        SELECT * 
        FROM movies,creators,stars
        WHERE movies.mid = creators.midc
        AND movies.mid = stars.mids
        AND movies.title LIKE ?
    `;
    conn.query(queryString, [title, title], (err, result, fields) => {
        if (result && result.length > 0) {
            res.json(result);
        } else {
            res.json({
                success: false,
                Error: "Incorrect Select Person."
            });
        }
    });
});


