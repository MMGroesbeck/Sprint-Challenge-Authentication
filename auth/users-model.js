const db = require("../database/dbConfig.js");

module.exports = {
    find,
    findBy,
    add,
    findById,
    findWithPass
}

function find() {
    return db("users").select("id", "username", "department");
}

function findBy(filter) {
    return db("users").select("id", "username", "department")
        .where(filter);
}

function findWithPass(filter) {
    return db("users").where(filter);
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
}

function findById(id) {
    return db("users")
        .where({ id })
        .first();
}