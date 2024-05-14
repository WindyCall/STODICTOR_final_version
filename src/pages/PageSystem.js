import "../styles.css";
import DashboardRouter from "../Component/DashboardRouter";
import AccountRouter from "../Component/AccountRouter";
import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, useAuth } from "../hooks/useAuth";
import { storage } from "../hooks/useAuth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Pikachu from "../pictures/Pikachu.png";

function PageSystem(props) {
  const { user } = useAuth();
  const { pageType } = props;

  function setRecordsState(newRecords) {
    setRecords(newRecords);
    setDoc(doc(db, "records", user?.uid), { records: newRecords });
  }

  function setItemsState(newItems) {
    setItems(newItems);
    setDoc(doc(db, "items", user?.uid), { items: newItems });
  }

  function setCategoriesState(newCategories) {
    setCategories(newCategories);
    setDoc(doc(db, "categories", user?.uid), { categories: newCategories });
  }

  function setSideDataState(newSideData) {
    setSideData(newSideData);
    setDoc(doc(db, "sideData", user?.uid), { sideData: newSideData });
  }

  // can add some sample data here
  useEffect(() => {
    async function fetchData() {
      const docSnapshotRecords = await getDoc(doc(db, "records", user?.uid));
      const docSnapshotItems = await getDoc(doc(db, "items", user?.uid));
      const docSnapshotCategories = await getDoc(
        doc(db, "categories", user?.uid)
      );
      const docSnapshotSideData = await getDoc(doc(db, "sideData", user?.uid));
      if (docSnapshotRecords.exists()) {
        setRecords(docSnapshotRecords.data().records);
      } else {
        setRecords([
          {
            Id: "02020030020",
            category: "Fruit",
            name: "banana",
            price: 10,
            cnt: 20,
            date: "07/18/2022"
          },
          {
            Id: "02020030020",
            category: "Fruit",
            name: "banana",
            price: 5,
            cnt: -15,
            date: "07/18/2022"
          },

          {
            Id: "02020030023",
            category: "Food",
            name: "icecream",
            price: 5,
            cnt: 50,
            date: "06/16/2022"
          },
          {
            Id: "02020030023",
            category: "Food",
            name: "icecream",
            price: 6,
            cnt: -20,
            date: "06/18/2022"
          },

          {
            Id: "02020030022",
            category: "Necessities",
            name: "box",
            price: 500,
            cnt: 6,
            date: "07/18/2022"
          },
          {
            Id: "02020030022",
            category: "Necessities",
            name: "box",
            price: 600,
            cnt: -5,
            date: "07/20/2022"
          },

          {
            Id: "02020030024",
            category: "electronic devices",
            name: "computer",
            price: 1000,
            cnt: 10,
            date: "07/18/2022"
          },
          {
            Id: "02020030024",
            category: "electronic devices",
            name: "computer",
            price: 1500,
            cnt: -7,
            date: "07/18/2022"
          },

          {
            Id: "02020030021",
            category: "Fruit",
            name: "apple",
            price: 5,
            cnt: 100,
            date: "07/18/2022"
          },
          {
            Id: "02020030021",
            category: "Fruit",
            name: "apple",
            price: 7,
            cnt: -80,
            date: "07/18/2022"
          }
        ]);
      }
      if (docSnapshotItems.exists()) {
        setItems(docSnapshotItems.data().items);
      } else {
        setItems([
          {
            Id: "02020030020",
            category: "Fruit",
            name: "banana",
            predictSale: 0,
            storage: 0
          },
          {
            Id: "02020030021",
            category: "Fruit",
            name: "apple",
            predictSale: 0,
            storage: 0
          },
          {
            Id: "02020030022",
            category: "Necessities",
            name: "box",
            predictSale: 0,
            storage: 0
          },
          {
            Id: "02020030023",
            category: "Food",
            name: "icecream",
            predictSale: 0,
            storage: 0
          },
          {
            Id: "02020030024",
            category: "electronic devices",
            name: "computer",
            predictSale: 0,
            storage: 0
          }
        ]);
      }
      if (docSnapshotCategories.exists()) {
        setCategories(docSnapshotCategories.data().categories);
      } else {
        setCategories([
          { Id: 0, name: "Fruit" },
          { Id: 2, name: "Necessities" },
          { Id: 3, name: "Drinks" },
          { Id: 4, name: "Food" },
          { Id: 5, name: "electronic devices" }
        ]);
      }
      if (docSnapshotSideData.exists()) {
        setSideData(docSnapshotSideData.data().sideData);
      } else {
        setSideData(["STODICTOR", "", "+65 00000000", "@STODICTOR"]);
      }
    }
    fetchData();
  }, [user.uid]);

  const [items, setItems] = useState([]);

  const [categories, setCategories] = useState([]);

  const [records, setRecords] = useState([]);

  const [sideData, setSideData] = useState(["", "", "", ""]);
  // sideData[0] => shopName
  // sideData[1] => shopPhoto

  function addItemsByHistory() {
    items.forEach((item) => {
      const num = records
        .filter((record) => record.name === item.name)
        .map((record) => record.cnt)
        .reduce((x, y) => x + y, 0);
      item.storage = num;
    });
  }

  addItemsByHistory();

  const [newItemCategory, setNewItemCategory] = useState("");

  function handleAddNewItem(name, id, category) {
    if (name === "" || id === "" || category === "") {
      alert("Error: Empty input, please input correctly.");
      return;
    }

    if (items.filter((w) => w.name === name || w.Id === id).length > 0) {
      alert("this item has already existed\n\nplease add another one");
      return;
    }

    if (id.length !== 11) {
      alert("ID does not contain 11 digits\n\nplease add another one");
      return;
    }

    const newItems = [
      ...items,
      {
        Id: id,
        category: category,
        name: name,
        storage: 0,
        predictSale: 0
      }
    ];

    setItemsState(newItems);
    setNewItemCategory("");
    alert("The item " + name + " has been added successfully");
  }

  function handelDeleteItem(item) {
    const idx = items.indexOf(item);
    if (confirm("Are you sure you want to delete this item?")) {
      if (items[idx].storage > 0) {
        if (
          !confirm(
            "Your Warehouse still has this item\n\nPress to confirm this deletion"
          )
        ) {
          return;
        }
      }
      const name = items[idx].name;
      const newItems = [...items.slice(0, idx), ...items.slice(idx + 1)];
      setItemsState(newItems);
      alert(name + "has been successfully deleted");
    }
  }

  function handleDeleteRecord(record) {
    if (confirm("Are you sure you want to delete this record?")) {
      const idx = records.indexOf(record);
      const newRecords = [...records.slice(0, idx), ...records.slice(idx + 1)];
      setRecordsState(newRecords);
      alert("the record has been successfully deleted");
    }
  }

  function checkIdNameCategoryMatch(name, id, category) {
    return (
      items.filter(
        (item) =>
          item.name == name && item.Id === id && item.category === category
      ).length > 0
    );
  }

  function handleUpdateRecord(
    record,
    id,
    name,
    category,
    date,
    price,
    cnt,
    originalCnt
  ) {
    const idx = records.indexOf(record);
    if (date === "" || !price || !cnt) {
      alert("Error: Empty input, please input correctly.");
      return;
    }
    if (confirm("Are you sure you want to update this record?")) {
      if (!checkIdNameCategoryMatch(name, id, category)) {
        alert(
          "the Id, name and category of this item does not match\n\n please reinput the information"
        );
        return;
      }
      console.log(originalCnt);
      if (
        items.filter((item) => item.Id === id)[0].storage -
          originalCnt +
          cnt * 1 <
        0
      ) {
        alert(
          "ERROR: Remaining stock is not enough\n\nplease reupdate this record"
        );
        return;
      }
      const newRecord = {
        Id: id,
        category: category,
        name: name,
        price: price * 1,
        cnt: cnt * 1,
        date: date
      };
      const newRecords = [
        ...records.slice(0, idx),
        newRecord,
        ...records.slice(idx + 1)
      ];
      setRecordsState(newRecords);
      alert("this record has been successfully updated");
    }
  }

  function handleAddNewRecord(tradeType, id, name, category, date, price, cnt) {
    if (date == "" || !price || !cnt) {
      alert("Error: Empty input, please input correctly.");
      return;
    }
    if (!tradeType) {
      if (items.filter((item) => item.Id === id)[0].storage < cnt) {
        alert("Remaining stock is not enough for this purchase");
        return;
      }
    }
    const newCnt = tradeType ? 1 * cnt : -cnt;
    // console.log(id, name, category, date, price, newCnt);
    // console.log(records)
    const newRecord = {
      Id: id,
      category: category,
      name: name,
      price: price * 1,
      cnt: newCnt,
      date: date
    };
    const newRecords = [...records, newRecord];
    setRecordsState(newRecords);

    /*

    This part for creating data only
    var newRecords = [];
    var newRecords = [];
    for (var i = 0; i < 25; i++) newRecords[i] = newRecord;
    setRecordsState([...records, ...newRecords]);
    */

    addItemsByHistory();
    alert("successfully added\n\nyou can find this record in History section");
  }

  function handleAddNewCategory(name) {
    if (name == "") {
      alert("category name can not be empty");
      return;
    }
    let nameWithOutSpace = "";
    for (let i = 0; i < name.length; i = i + 1) {
      const x = name.charAt(i);
      if (x === " ") break;
      nameWithOutSpace = nameWithOutSpace + x;
    }
    if (
      categories.filter((category) => category.name === nameWithOutSpace)
        .length > 0
    ) {
      alert("this name has already existed\n\nplease add another name");
      return;
    }
    const num = categories.length;
    const newCategory = {
      Id: num,
      name: name
    };
    const newLastCategory = {
      Id: num + 1,
      name: "Others"
    };
    const newCategories = [
      ...categories.slice(0, num - 1),
      newCategory,
      newLastCategory
    ];
    setCategoriesState(newCategories);
    alert("successfully added\n\nyou can find this category in any list");
  }

  function handelUpadteUserProfile(name, url, phoneNo, telegram) {
    // console.log(name);
    // console.log(url);
    const newSideData = [name, url, phoneNo, telegram];
    setSideDataState(newSideData);
    alert("Your profile has been updated");
  }

  /*

  Id: id,
        category: category,
        name: name,
        storage: 0,
        predictSale: undefined

  */

  function handlePredicting(cntArray) {
    const newItems = items.map((item, idx) => {
      return {
        Id: item.Id,
        category: item.category,
        name: item.name,
        storage: item.storage,
        predictSale: cntArray[idx]
      };
    });
    console.log(newItems);
    setItemsState(newItems);
  }

  const [url, setUrl] = useState();

  useEffect(() => {
    const func = async () => {
      if (sideData[1] === "") {
        setUrl(Pikachu);
        return;
      }
      const reference = ref(storage, `/files/${sideData[1]}`);
      await getDownloadURL(reference).then((x) => {
        setUrl(x);
      });
    };
    func();
  }, [sideData[1]]);

  /*function getPhotoUrl() {  
    if (sideData[1] === "") return require("../pictures/Pikachu.png");
    const reference = ref(storage, `/files/${sideData[1]}`);
    await getDownloadURL(reference).then((x) => setUrl(x));
    return url;
  }*/

  return (
    <>
      <DashboardRouter
        onAddNewRecord={handleAddNewRecord}
        onUpdateRecord={handleUpdateRecord}
        onDeleteRecord={handleDeleteRecord}
        onDeleteItem={handelDeleteItem}
        onAddNewItem={handleAddNewItem}
        onAddNewCategory={handleAddNewCategory}
        items={items}
        categories={categories}
        records={records}
        newItemCategory={newItemCategory}
        setNewItemCategory={setNewItemCategory}
        sideData={sideData}
        onUpdateUserProfile={handelUpadteUserProfile}
        onHandlePredicting={handlePredicting}
        profilePhotoURL={url}
      />
    </>
  );
}

export default PageSystem;
