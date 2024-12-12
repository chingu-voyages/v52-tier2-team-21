import axios from 'axios';

export const fetchAddresses = async (): Promise<string[]> => {
  try {
    const response = await axios.get(
      'https://data.lacity.org/api/views/4ca8-mxuh/columns.json'
    );

    const data = response.data;
    const addressField = data.find(
      (field: any) => field.name === 'Address' || field.description?.includes('Address')
    );
    console.log(data)

    if (!addressField) {
      console.error('Address field not found in the dataset');
      return [];
    }

    const addresses = addressField.cachedContents?.top.map(
      (item: any) => item.item
    ) || [];

    return addresses;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return [];
  }
};
