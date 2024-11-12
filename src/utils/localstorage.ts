// localStorageUtils.ts
export const updateLocalStorageArray = (key: string, newItem: string): void => {
    try {
      // Retrieve the existing array from localStorage
      const existingItems = localStorage.getItem(key);
      let itemsArray = existingItems ? JSON.parse(existingItems) : [];
  
      // Add the new item if it doesn't already exist
      if (!itemsArray.includes(newItem)) {
        itemsArray.push(newItem);
        // Save the updated array back to localStorage
        localStorage.setItem(key, JSON.stringify(itemsArray));
        console.log(`Updated ${key}:`, itemsArray);
      } else {
        console.log(`Item "${newItem}" already exists in ${key}`);
      }
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error);
    }
  };
  