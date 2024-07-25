import * as SQLite from "expo-sqlite";
import { log } from "react-native-sqlite-storage/lib/sqlite.core";
import paiements from "../Utils/paiements";
import db from "./DataBase";
export const openDB = async () => {
  x = "haahaa";
  // var db = null;

  // try {
  //   db = await SQLite.openDatabaseAsync("mainDBs.db");
  //   await db.execAsync("PRAGMA foreign_keys = OFF;");

  //   return db;
  // } catch (error) {
  //   console.log("Error while opening database");
  //   alert(error);
  //   return null;
  // }
  return db;
};
// how to remove database ?

export const emptyDB = async () => {
  const db = await openDB();
  writeQuery("DROP TABLE IF EXISTS DETAILCOMMANDE", db);
  writeQuery("DROP TABLE IF EXISTS COMMANDE", db);
  writeQuery("DROP TABLE IF EXISTS CLIENT", db);
  writeQuery("DROP TABLE IF EXISTS PRODUCT_ENR", db);
  writeQuery("DROP TABLE IF EXISTS PRODUCT", db);
};

export const removeDB = async () => {
  const db = await openDB();
  const result = await db.execAsync(
    "DROP TABLE IF EXISTS CLIENT;DROP TABLE IF EXISTS PRODUCT;DROP TABLE IF EXISTS COMMANDE;DROP TABLE IF EXISTS DETAILCOMMANDE;DROP TABLE IF EXISTS PRODUCT_ENR"
  );
  console.log("====================================");
  console.log(result);
  console.log("====================================");
};
export const removeTable = async () => {
  const db = await openDB();
  writeQuery("DROP TABLE CLIENT", db);
};

export const readQuery = async (query, db, callback) => {
  if (db && db != null) {
    const result = await db.getAllAsync(query);
    callback(result);
    if (result.length > 0) return result;
    else return null;
  } else {
    console.log("DB is null");
    return null;
  }
};

export const writeQuery = async (query, db) => {
  if (db && db != null) {
    if (db && db != null) {
      const result = await db.runAsync(query);
    } else {
      console.log("DB is null");
      return null;
    }
  }
};

export const addClient = async (name, phoneN, city) => {
  const db = await openDB();
  await writeQuery(
    `CREATE TABLE IF NOT EXISTS CLIENT (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT,
        PHONE TEXT,
        CITY TEXT,
        DATE DATE);`,
    db
  );
  console.log("CLIENT TABLE CREATED");
  await writeQuery(
    `INSERT INTO CLIENT (NAME,PHONE,CITY,DATE) VALUES("${name}","${phoneN}","${city}",'${getCurrentDate()}');`,
    db
  );
  console.log("CLIENT ADDED");
};
export const addProduct = async (NomProduit, bPrice, sPrice, qte) => {
  const db = await openDB();
  await writeQuery(
    `CREATE TABLE IF NOT EXISTS PRODUCT (
      IDPRODUCT INTEGER PRIMARY KEY AUTOINCREMENT,
      PRODNAME TEXT,
      DATE DATE
    );`,
    db
  );
  console.log("PRODUCT TABLE CREATED");
  await writeQuery(
    `CREATE TABLE IF NOT EXISTS PRODUCT_ENR (
            IDENR INTEGER PRIMARY KEY AUTOINCREMENT,
            IDPRODUCT INTEGER,
            BPRICE REAL,
            SPRICE REAL,
            QTE INTEGER,
            DATE DATE,
            FOREIGN KEY (IDPRODUCT) REFERENCES PRODUCT (IDPRODUCT) ON DELETE CASCADE
            );`,
    db
  );

  readQuery(
    `SELECT * FROM PRODUCT WHERE PRODNAME = "${NomProduit}"`,
    db,
    (main_res) => {
      if (main_res && main_res.length > 0) {
        // console.log(main_res);
        readQuery(
          `SELECT * FROM PRODUCT_ENR 
              WHERE IDPRODUCT = ${main_res[0].IDPRODUCT} 
              AND BPRICE = ${bPrice}
              AND SPRICE = ${sPrice}`,
          db,
          (res) => {
            if (res && res.length > 0) {
              writeQuery(
                `UPDATE PRODUCT_ENR 
                    SET QTE = QTE + ${qte}
                    WHERE IDENR = ${res[0].IDENR} `,
                db
              );
            } else {
              writeQuery(
                `INSERT INTO PRODUCT_ENR (IDPRODUCT,BPRICE,SPRICE,QTE,DATE)
                 VALUES(${
                   main_res[0].IDPRODUCT
                 },${bPrice},${sPrice},${qte},"${getCurrentDate()}")`,
                db
              );
            }
          }
        );
      } else {
        writeQuery(
          `INSERT INTO PRODUCT (PRODNAME,DATE) 
          VALUES("${NomProduit}","${getCurrentDate()}");`,
          db
        );
        readQuery(
          `SELECT * FROM PRODUCT WHERE PRODNAME = "${NomProduit}"`,
          db,
          (res) => {
            writeQuery(
              `INSERT INTO PRODUCT_ENR (IDPRODUCT,BPRICE,SPRICE,QTE,DATE)
               VALUES(${
                 res[0].IDPRODUCT
               },${bPrice},${sPrice},${qte},"${getCurrentDate()}")`,
              db
            );
          }
        );
      }
    }
  );
};
export const add_product_enr = async (
  idProduct,
  bPrice = 0,
  sPrice = 0,
  qte = 1
) => {
  const db = await openDB();

  await writeQuery(
    `INSERT INTO PRODUCT_ENR (IDPRODUCT,BPRICE,SPRICE,QTE,DATE)
                 VALUES(${idProduct},${bPrice},${sPrice},${qte},"${getCurrentDate()}")`,
    db
  );
};
export const remove_enr = async (id) => {
  const db = await openDB();
  writeQuery(`DELETE FROM PRODUCT_ENR WHERE IDENR = ${id}`, db);
};
export const getCurrentDate = (currentDate = new Date()) => {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
export const removePurchase = async () => {
  const db = await openDB();
  writeQuery("DROP TABLE COMMANDE", db);
};
export const getDetailsCommandes = async (
  callback = (res) => {
    console.log(res);
  }
) => {
  const db = await openDB();
  readQuery("SELECT * FROM DETAILCOMMANDE", db, callback);
};
export const removeDetailsCommandes = async () => {
  const db = await openDB();
  writeQuery("DROP TABLE DETAILCOMMANDE", db);
};
export const removeProducts = async () => {
  const db = await openDB();
  writeQuery("DROP TABLE PRODUCT", db);
};

export const addPurchase = async (date, idClient, commandes) => {
  const db = await openDB();
  await writeQuery(
    `CREATE TABLE IF NOT EXISTS COMMANDE (
      IDCOMM INTEGER PRIMARY KEY AUTOINCREMENT,
      DATECOMM DATE,
      STATE TEXT DEFAULT "UNPAID",
      IDCLIENT INTEGER REFERENCES CLIENT(id) ON DELETE NO ACTION,
      CONSTRAINT state_check CHECK (STATE IN ('UNPAID', 'PAID', 'CANCELED','DELIVERY','REFUNDED'))
    );`,
    db
  );
  console.log("COMMANDE CREATED");
  await writeQuery(
    `INSERT INTO COMMANDE (DATECOMM,IDCLIENT) 
          VALUES ("${date}",${idClient})`,
    db
  );
  console.log("COMMANDE ADDED");
  const addDetailCommande = async (idComm, myCommandes) => {
    const db = await openDB();
    await writeQuery(
      `CREATE TABLE IF NOT EXISTS DETAILCOMMANDE(
    IDCOMM INTEGER REFERENCES COMMANDE(IDCOMM) ON DELETE CASCADE,
    IDPROD INTEGER REFERENCES PRODUCT_ENR(IDENR) ON DELETE NO ACTION,
    QUANTITY INTEGER,
    TOTAL REAL,
    TOTALB REAL,
    REMISE REAL,
    DATE DATE 
    );`,
      db
    );
    console.log("DETAILCOMMANDE CREATED");
    myCommandes.forEach((res) => {
      readQuery(
        `SELECT SPRICE,BPRICE FROM PRODUCT_ENR WHERE IDENR = ${res.id} AND QTE > 0`,
        db,
        async (result) => {
          const db = await openDB();
          console.log("PRODUCT ENR SELECTED");
          console.log(res);
          console.log(result);
          await writeQuery(
            `INSERT INTO DETAILCOMMANDE 
            VALUES(${idComm},
            ${res.id},
            ${res.qte},
            ${result[0].SPRICE * res.qte},
            ${result[0].BPRICE * res.qte},
            ${res.remise ? res.remise : 0},
            "${date}")`,
            db
          );

          console.log("DETAILCOMMANDE ADDED");
          await writeQuery(
            `UPDATE PRODUCT_ENR SET QTE= QTE - ${res.qte} WHERE IDENR= ${res.id}`,
            db
          );
          console.log("PRODUCT ENR UPDATED");
        }
      );
    });
  };

  const callBack = (res) => {
    console.log("CALLBACK MAX IDCOMM");
    const idComm = res[0].IDCOMM;
    addDetailCommande(idComm, commandes);
  };
  readQuery("SELECT MAX(IDCOMM) as IDCOMM FROM COMMANDE", db, callBack);
  console.log("FINISHED");
};
export const getCommande_Gain = async (
  id,
  callback = (res) => console.log(res)
) => {
  const db = await openDB();
  readQuery(
    `SELECT SUM(TOTAL) - SUM(TOTALB) - SUM(REMISE) AS RESULT FROM DETAILCOMMANDE WHERE IDCOMM = ${id}`,
    db,
    callback
  );
};
export const update_state = async (id, value) => {
  const db = await openDB();

  console.log(id, value);

  readQuery(`SELECT STATE FROM COMMANDE WHERE IDCOMM = ${id}`, db, (res) => {
    console.log("============ INSIDE UPDATE STATE========================");

    console.log("====================================");
    if (
      res &&
      res.length > 0 &&
      (res[0].STATE === paiements.PAID ||
        res[0].STATE === paiements.DELIVERY ||
        res[0].STATE === paiements.UNPAID) &&
      (value === paiements.CANCELED || value === paiements.REFUNDED)
    ) {
      readQuery(
        `SELECT IDPROD,QUANTITY FROM DETAILCOMMANDE WHERE IDCOMM = ${id}`,
        db,
        (res) => {
          res.forEach((element) => {
            writeQuery(
              `UPDATE PRODUCT_ENR SET QTE = QTE + ${element.QUANTITY} WHERE IDENR = ${element.IDPROD}`,
              db
            );
          });
        }
      );
    }
    if (
      res &&
      res.length > 0 &&
      (res[0].STATE === paiements.CANCELED ||
        res[0].STATE === paiements.REFUNDED) &&
      (value === paiements.PAID ||
        value === paiements.DELIVERY ||
        value === paiements.UNPAID)
    ) {
      readQuery(
        `SELECT IDPROD,QUANTITY FROM DETAILCOMMANDE WHERE IDCOMM = ${id}`,
        db,
        (res) => {
          res.forEach((element) => {
            writeQuery(
              `UPDATE PRODUCT_ENR SET QTE = QTE - ${element.QUANTITY} WHERE IDENR = ${element.IDPROD}`,
              db
            );
          });
        }
      );
    }
  });
  await writeQuery(
    `UPDATE COMMANDE SET STATE = "${value}" WHERE IDCOMM = ${id}`,
    db
  );
};
export const getCommandes = async (
  callback = (res) => {
    console.log("===============GET COMMANDE=====================");
    console.log(res);
    console.log("====================================");
  }
) => {
  const db = await openDB();
  readQuery("SELECT * FROM COMMANDE", db, callback);
};
export const ups_paid = async (idComm) => {
  const db = await openDB();
  writeQuery(`UPDATE COMMANDE SET UPS_PAID = 1 WHERE IDCOMM = ${idComm}`, db);
};
export const getClients = async (
  callback = (res) => {
    console.log("==================GET CLIENTS==================");
    console.log(res);
    console.log("====================================");
  }
) => {
  const db = await openDB();
  return readQuery("SELECT * FROM CLIENT ORDER BY id", db, callback);
};
export const getProducts = async (
  callback = (res) => {
    console.log("CAALBAACK");
    console.log(res);
  }
) => {
  final_res = [];
  const db = await openDB();
  return readQuery(
    `SELECT P.*, SUM(PE.QTE) AS QTE, PE.SPRICE, PE.BPRICE
        FROM PRODUCT P
        JOIN PRODUCT_ENR PE ON P.IDPRODUCT = PE.IDPRODUCT
        WHERE PE.QTE > 0
        GROUP BY P.IDPRODUCT
        ORDER BY MIN(PE.DATE)`,
    db,
    callback
  );
};
export const getProductenr = async (
  id,
  callBack = (res) => {
    console.log(res);
  }
) => {
  const db = await openDB();
  await readQuery(
    `SELECT * FROM PRODUCT_ENR WHERE IDPRODUCT = ${id} AND QTE > 0`,
    await openDB(),
    callBack
  );
};
export const removeClient = async (id) => {
  const db = await openDB();
  writeQuery(`DELETE FROM CLIENT WHERE id = ${id}`, db);
};
export const removePurchaseFromId = async (idComm) => {
  const db = await openDB();
  await readQuery(
    `SELECT STATE FROM COMMANDE WHERE IDCOMM = ${idComm}`,
    db,
    (res) => {
      console.log("WAIT A MOMENT ====~~~~~~~");
      if (
        res &&
        res.length > 0 &&
        (res[0].STATE === paiements.PAID ||
          res[0].STATE === paiements.DELIVERY ||
          res[0].STATE === paiements.UNPAID)
      ) {
        console.log("===================WE ARE INSIDE=================");
        console.log(res);
        console.log("====================================");
        readQuery(
          `SELECT IDPROD,QUANTITY FROM DETAILCOMMANDE WHERE IDCOMM = ${idComm}`,
          db,
          (res) => {
            res.forEach((element) => {
              writeQuery(
                `UPDATE PRODUCT_ENR SET QTE = QTE + ${element.QUANTITY} WHERE IDENR = ${element.IDPROD}`,
                db
              );
            });
          }
        );
      }
    }
  );
  await writeQuery(`DELETE FROM DETAILCOMMANDE WHERE IDCOMM = ${idComm}`, db);
  await writeQuery(`DELETE FROM COMMANDE WHERE IDCOMM = ${idComm}`, db);
};
export const removeProduct = async (id) => {
  const db = await openDB();
  await writeQuery(`DELETE FROM PRODUCT WHERE IDPRODUCT = ${id}`, db);
  await writeQuery(`DELETE FROM PRODUCT WHERE IDPRODUCT = ${id}`, db);
};
export const getTotalSpending = async (
  id,
  callback = (res) => {
    console.log(res);
  }
) => {
  const db = await openDB();
  readQuery(
    `SELECT SUM(DC.TOTAL)-SUM(DC.REMISE) AS TOTAL FROM COMMANDE C
      JOIN DETAILCOMMANDE DC ON C.IDCOMM = DC.IDCOMM
      WHERE C.IDCLIENT = ${id};`,
    db,
    callback
  );
};
export const total_ups_caisse = async (
  callBack = (res) => console.log(res)
) => {
  readQuery(
    `SELECT SUM(DC.TOTAL) - SUM(DC.REMISE) FROM COMMANDE C JOIN DETAILCOMMANDE DC ON DC.IDCOMM = C.IDCOMM WHERE C.UPS_PAID = 1`,
    await openDB(),
    callBack
  );
};
export const getClientWithTotalSpending = async (
  callback = (res) => {
    console.log(res);
  }
) => {
  const db = await openDB();
  readQuery(
    `SELECT C.id,C.CITY,C.PHONE,C.NAME, SUM(TOTAL) - SUM(REMISE) AS amount FROM CLIENT C
  JOIN COMMANDE CM ON CM.IDCLIENT = C.id JOIN DETAILCOMMANDE DC ON CM.IDCOMM = DC.IDCOMM
  GROUP BY C.id,C.CITY,C.PHONE,C.NAME
  ORDER BY C.id`,
    db,
    callback
  );
};
export const getMontantCommande = async (
  idComm,
  callback = (res) => {
    console.log(res);
  }
) => {
  const db = await openDB();
  readQuery(
    `SELECT SUM(DC.TOTAL) - SUM(DC.REMISE) AS TOTAL FROM DETAILCOMMANDE DC
     WHERE DC.IDCOMM = ${idComm} `,
    db,
    callback
  );
};
export const getTotalGain = async (
  callback = (res) => {
    console.log(res);
  }
) => {
  const db = await openDB();
  readQuery(
    `SELECT SUM(TOTAL ) - SUM(TOTALB) - SUM(REMISE) AS RESULT
     FROM DETAILCOMMANDE `,
    db,
    callback
  );
};
export const getTop3 = async (
  startDate = new Date("2001-01-01"),
  endDate = new Date("2024-07-24"),
  callback = (res) => {
    console.log(res);
  }
) => {
  const db = await openDB();
  readQuery(
    `SELECT P.PRODNAME,
            SUM(DC.TOTAL-DC.TOTALB-DC.REMISE) AS CA
            FROM PRODUCT P 
            JOIN DETAILCOMMANDE DC 
            ON DC.IDPROD = P.IDPRODUCT 
            WHERE DC.DATE BETWEEN '${getCurrentDate(
              startDate
            )}' AND '${getCurrentDate(endDate)}' 
            GROUP BY P.PRODNAME 
            ORDER BY CA DESC `,
    db,
    callback
  );
};
export const updatePhone = async (id, phone) => {
  console.log("PHONE INSIDE , " + phone);
  const db = await openDB();
  writeQuery(`UPDATE CLIENT SET PHONE = "${phone}" WHERE id = ${id};`, db);
};

export const updateQuantity = async (id, quantity) => {
  const db = await openDB();
  writeQuery(
    `UPDATE PRODUCT_ENR SET QTE = ${quantity}
       WHERE IDENR = ${id} ;`,
    db
  );
};
export const updateBprice = async (id, bprice) => {
  const db = await openDB();
  writeQuery(
    `UPDATE PRODUCT_ENR SET BPRICE = ${bprice} WHERE IDENR = ${id};`,
    db
  );
};
export const updateSprice = async (id, sprice) => {
  const db = await openDB();
  writeQuery(
    `UPDATE PRODUCT_ENR SET SPRICE = ${sprice} WHERE IDENR = ${id};`,
    db
  );
};
export const updateQte = async (id, qte) => {
  const db = await openDB();
  writeQuery(`UPDATE PRODUCT_ENR SET QTE = ${qte} WHERE IDENR = ${id};`, db);
};
export const getTurnover = async (id, callback = (res) => console.log(res)) => {
  const db = await openDB();

  readQuery(
    `SELECT SUM(DC.TOTAL-DC.REMISE) AS RESULT FROM DETAILCOMMANDE DC JOIN PRODUCT_ENR P 
  ON DC.IDPROD = P.IDPRODUCT WHERE P.IDPRODUCT = ${id} GROUP BY P.IDPRODUCT;`,
    db,
    callback
  );
};
export const getStock_value = async (
  id,
  callback = (res) => console.log(res)
) => {
  const db = await openDB();
  readQuery(
    `SELECT SUM(QTE * BPRICE) VALUE FROM PRODUCT_ENR WHERE IDPRODUCT = ${id}`,
    db,
    callback
  );
};
export const total_stock_value = async (
  callback = (res) => console.log(res)
) => {
  readQuery(
    `SELECT SUM(QTE * BPRICE) VALUE FROM PRODUCT_ENR`,
    await openDB(),
    callback
  );
};
export const total_product_gain = async (
  callback = (res) => console.log(res)
) => {
  readQuery(
    `SELECT SUM(SPRICE - BPRICE)* QTE VALUE FROM PRODUCT_ENR`,
    await openDB(),
    callback
  );
};
export const getCommandeProducts = async (
  idComm,
  callback = (res) => console.log(res)
) => {
  const db = await openDB();
  readQuery(
    `SELECT P.PRODNAME,DC.QUANTITY,DC.REMISE FROM DETAILCOMMANDE DC 
      JOIN PRODUCT_ENR PE ON DC.IDPROD = PE.IDPRODUCT 
      JOIN PRODUCT P ON PE.IDPRODUCT = P.IDPRODUCT 
      WHERE DC.IDCOMM = ${idComm}`,
    db,
    callback
  );
};
export const getCommandeWithTurnover = async (
  callback = (res) => {
    console.log(res);
  }
) => {
  const db = await openDB();
  readQuery(
    `SELECT C.DATECOMM,
    C.IDCLIENT,
    CL.NAME AS clientName,
    CL.CITY AS CITY,
    C.IDCOMM,
    SUM(TOTAL) AS TOTALS,
    SUM(TOTALB) AS TOTALB,
    SUM(REMISE) AS TOTALR ,
    SUM(TOTAL-REMISE) AS TOTAL,
    C.STATE
        FROM COMMANDE C
        LEFT JOIN DETAILCOMMANDE DC 
        ON C.IDCOMM = DC.IDCOMM 
        LEFT JOIN CLIENT CL 
        ON CL.ID = C.IDCLIENT
        GROUP BY C.IDCOMM`,
    db,
    callback
  );
  console.log("FINISHED =======<<<");
};
export const getClientTurnover = async (
  id,
  callback = (res) => console.log(res)
) => {
  const db = await openDB();
  readQuery(
    `SELECT SUM(DC.TOTAL-DC.REMISE)  AS RESULT FROM DETAILCOMMANDE DC JOIN COMMANDE C 
  ON DC.IDCOMM = C.IDCOMM  WHERE C.IDCLIENT = ${id};`,
    db,
    callback
  );
};
export const get_state_amount = async (state, callback = () => undefined) => {
  const db = await openDB();
  await readQuery(
    `SELECT SUM(DC.TOTAL) AS RESULT FROM COMMANDE C 
    JOIN DETAILCOMMANDE DC 
    ON DC.IDCOMM = C.IDCOMM
    WHERE C.STATE = "${state}"`,
    db,
    callback
  );
};
export const format_price = (value = 0, reduce = true) => {
  if (reduce) {
    if (value > 1000000) return (value / 1000000).toFixed(2) + "M";
    else if (value > 1000) return (value / 1000).toFixed(2) + "K";
    else return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  } else return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
export const getClientName = async (
  idClient,
  callback = (res) => console.log(res)
) => {
  const db = await openDB();
  readQuery(`SELECT NAME FROM CLIENT WHERE id = ${idClient}`, db, callback);
};
