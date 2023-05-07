import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // ------------------------------------------------------------------

  export const putDb = async (content) => {
    console.log('PUT to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  };

// ---------------------------------------------------------------------

export const getDb = async () => {

    const jateDb = await openDB('jate', 1);

   const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

 const request = store.getAll()
const requestOne = store.get(1);

  const result = await request;
  const findOne = await requestOne
  console.log('result', result);
  console.log('result.value', result.value);
  console.log('result.jate', result.jate);
  console.log('find one', findOne)
  return findOne.value;
}

initdb();

