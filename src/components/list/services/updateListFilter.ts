import { IRequests } from "../../../apis/list/types";
import {
  getDataFromStorage,
  setDataToStorage,
} from "../../../services/asyncStorage";
import { DataItem } from "../../../services/types";

export const updateFilterList = async (field: string, Items: IRequests[]) => {
  const filteredData = [
    ...new Set(
      Items.map((obj) => obj[field as keyof IRequests]).filter(
        (value): value is string => typeof value === "string"
      )
    ),
  ];

  const updateData = async (field: string, filteredData: string[]) => {
    let data = await getDataFromStorage();
    let existingData = data[field];

    if (existingData) {
      const updatedFieldData: DataItem[] = [
        ...new Set([...existingData.map((item) => item.name), ...filteredData]),
      ].map((name: string) => ({ name, activate: true }));
      data[field] = updatedFieldData;
    } else {
      data[field] = filteredData.map((name: string) => ({
        name,
        activate: true,
      }));
    }

    await setDataToStorage(data).then(() => {});
  };
  await updateData(field, filteredData);
};
