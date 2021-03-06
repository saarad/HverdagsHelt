//@flow

import fs from 'fs';

module.exports = function run(filename: string, pool: Object, done: Function) {
    console.log("runsqlfile: reading file " + filename);
    let sql = fs.readFileSync(filename, "utf8");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("runsqlfile: error connecting");
          if (done instanceof Function) {
            done();
          } else {
            return;
          }
        } else {
            console.log("runsqlfile: connected");
            connection.query(sql, (err, rows) => {
                connection.release();
                if (err) {
                    console.log(err);
                  if (done instanceof Function) {
                    done();
                  } else {
                    return;
                  };
                } else {
                  console.log("runsqlfile: run ok");
                    if (done instanceof Function) {
                        done();
                    } else {
                        return;
                    }


                }
            });
        }
    });
};