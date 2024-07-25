import * as FileSystem from "expo-file-system";

export const exportDB = async () => {
  try {
    const uri = `${FileSystem.documentDirectory}SQLite/mainDBs.db`;

    let files = await FileSystem.readDirectoryAsync(
      `${FileSystem.documentDirectory}`
    );
    if (!files.includes("DatabaseExports")) {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}DatabaseExports`
      );
    }
    files = await FileSystem.readDirectoryAsync(
      `${FileSystem.documentDirectory}DatabaseExports`
    );
    let version = 0;

    for (let file of files) {
      the_version = parseInt(file.split("_")[1]);
      if (the_version + 1 > version) {
        version = the_version + 1;
      }
    }
    console.log("============version========================");
    console.log(version);
    console.log("====================================");
    const uri2 = `${FileSystem.documentDirectory}DatabaseExports/busigestDB_${version}.db`;
    try {
      await FileSystem.copyAsync({
        from: uri,
        to: uri2,
      });
      alert("Database exported");
    } catch (e) {
      console.log(e);
      alert(`${e} \n\nError while exporting database`);
    }
    // const uri2 = FileSystem.documentDirectory + "mainDBs.db";
    console.log(files);
    // await FileSystem.copyAsync({
    // from: uri,
    // to: uri2,
    // });
    // alert("Database exported");
  } catch (error) {
    console.log("Error while exporting database");
    alert(error);
  }
};

export const checkDB = async () => {
  try {
    // const uri = `${FileSystem.documentDirectory}SQLite/mainDBs.db`;
    // const info = await FileSystem.getInfoAsync(uri);
    // if (info.exists) {
    // alert("Database exists");
    // } else {
    // alert("Database does not exist");
    // }
    const files = await FileSystem.readDirectoryAsync(
      `${FileSystem.documentDirectory}DatabaseExports`
    );
    for (let file of files) {
      const res = await FileSystem.getInfoAsync(
        `${FileSystem.documentDirectory}DatabaseExports/${file}`
      );
      console.log(res);
    }
  } catch (error) {
    console.log("Error while checking database");
    alert(error);
  }
};
