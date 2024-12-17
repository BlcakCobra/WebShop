import axios from "axios";
import { FilteredProductType, ProductType } from "../types/ProductSliceType";

const BaseUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/'
});



  
export const RequestesToServer = {
    RegistrationReq(username: string, password: string, confirmPassword: string) {
        try {
            return BaseUrl.post("/register", { username, password, confirmPassword });
        } catch (error) {
            throw new Error(`Something went wrong: ${error}`);
        }
    },
    LoginReq(username: string, password: string) {
        try {
            return BaseUrl.post("/login", { username, password });
        } catch (error) {
            throw new Error(`Something went wrong: ${error}`);
        }
    },
    async CreateProductReq(token: string, product: ProductType) {
        try {
          if (!token) {
            throw new Error("Authorization token is required.");
          }
      
          const {
            sex,
            type,
            image,
            color,
            description,
            size,
            price,
            stock,
            createdAt,
            discount,
            rating,
            views,
          }: FilteredProductType = product;
      
          const filteredProduct = {
            sex,
            type,
            image,
            color,
            description,
            size,
            price,
            stock,
            createdAt,
            discount,
            rating,
            views,
          };
      
          const response = await BaseUrl.post("/products", filteredProduct, {
            
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(filteredProduct);
      
          if (response.status !== 201) {
            throw new Error(`Failed to create product. Server responded with status: ${response.status}`);
          }
      
          return response.data;
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error("Error creating product:", error.message);
            if (error.response) {
              throw new Error(`Server error: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
              throw new Error("No response received from server.");
            }
          } else if (error instanceof Error) {
            console.error("Unexpected error:", error.message);
            throw new Error(`Unexpected error: ${error.message}`);
          } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred.");
          }
        }
      }
};
