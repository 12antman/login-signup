const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration (name, password, email)
             values (?, ?, ?)`,
            [
            data.name, 
            data.password,
            data.email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: (callBack) => {
        pool.query(
            `select id, name, email FROM registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update registration set name=?, password=?, email=? WHERE id=?`,
            [data.name, 
            data.password,
            data.email,
            data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updatePassword: (userData, callBack) => {
        pool.query(
            `update registration set password=? where email=?`,
            [data.password, data.email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `delete from registration where id=?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email = ?`,
            [email],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            if (results.length === 0) {
                console.log("No user found with email:", email);
                return callBack(null, null);
            }
            console.log("Retrieved user:", results[0]);
            return callBack(null, results[0]);
        }
    );
}
};