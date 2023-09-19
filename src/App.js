import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [newItem, setnewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setfetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not Recived");
        const listItems = await response.json();

        setItems(listItems);
        setfetchError(null);
      } catch (err) {
        setfetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    });
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addnewItem = { id, checked: false, item };
    const listItems = [...items, addnewItem];
    setItems(listItems);

    const postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addnewItem),
    };

    const result = await apiRequest(API_URL, postOption);
    if (result) setfetchError(result);
  };

  const handleChange = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);

    const patchOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, patchOption);

    if (result) setfetchError(result);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOption = {
      method: "DELETE",
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOption);

    if (result) setfetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setnewItem("");
  };

  return (
    <div className="App">
      <Header />
      <AddItem
        newItem={newItem}
        setnewItem={setnewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch}></SearchItem>
      <main>
        {isLoading && <p>Loading items..</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLocaleLowerCase())
            )}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
