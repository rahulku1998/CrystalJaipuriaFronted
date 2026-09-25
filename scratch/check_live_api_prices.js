import https from "https";

const API_URL = "https://shop.codewithrahulkumawat.com/api/products";

https.get(API_URL, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    try {
      const json = JSON.parse(data);
      const products = json.products || [];
      
      const krish = products.find(p => p._id === "6a93f43331429323dcbafa32");
      console.log("Live API product for Krishna (6a93f43331429323dcbafa32):");
      console.log({
        _id: krish?._id,
        name: krish?.name,
        price: krish?.price,
        discountPrice: krish?.discountPrice,
        stock: krish?.stock
      });

      console.log("\nChecking the other 3 items in live API:");
      ["6aa66b34a69037c73ebf090c", "6aa669efa69037c73ebf0869", "6aa5839ba69037c73ebec9f3"].forEach(id => {
        const p = products.find(prod => prod._id === id);
        console.log(`ID ${id}: price=${p?.price}, discountPrice=${p?.discountPrice}, name=${p?.name}`);
      });

    } catch (err) {
      console.error(err);
    }
  });
});
