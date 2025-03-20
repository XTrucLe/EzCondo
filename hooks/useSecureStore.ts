import { useState } from "react";
import * as SecureStore from "expo-secure-store";

const useStore = () => {
  const [value, setValue] = useState<string | null>(null);

  const set = async (key: string, value: any) => {
    try {
      let data = JSON.stringify(value);

      await SecureStore.setItemAsync(key, data);
      setValue(value);
    } catch (error) {
      console.error("Error setting value in SecureStore", error);
    }
  };

  const get = async (key: string) => {
    const value = await SecureStore.getItemAsync(key);
    setValue(value);
  };

  const remove = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
    setValue(null);
  };

  return { value, set, get, remove };
};
export default useStore;
