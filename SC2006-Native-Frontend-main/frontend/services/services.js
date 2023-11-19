export const fetchOrders = async () => {
  try {
    const response = await fetch(
      'http://10.0.2.2:8000/api/orderdata/',
    );
    const json = await response.json();
    setOrders(json);
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};
