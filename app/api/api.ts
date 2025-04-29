import axios from "axios";
import { FilteredProductType, ProductType } from "../types/ProductSliceType";
import {ProductDetailsType} from "../types/ProductDetails"
import { response } from "express";
function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.message);
    if (error.response) {
      throw new Error(`Server error: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No response received from server.");
    }
  }
  if (error instanceof Error) {
    console.error("Unexpected error:", error.message);
    throw new Error(`Unexpected error: ${error.message}`);
  }
  console.error("Unknown error:", error);
  throw new Error("An unexpected error occurred.");
}


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
          handleError(error)
        }
    },
    async CreateProductReq(token: string, product: ProductType) {
        try {
          if (!token) {
            throw new Error("Authorization token is required.");
          }
      
          const {
            name,
            sex,
            type,
            image,
            color,
            size,
            price,
            discount,
            rating,
            views,
          }: FilteredProductType = product;
      
          const filteredProduct = {
            name,
            sex,
            type,
            image,
            color,
            size,
            price,
            discount,
            rating,
            views,
          };
      
          const response = await BaseUrl.post("/createProducts", filteredProduct, {
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
          handleError(error)
        }
      },
      getAllProducts() {
        try {
            return BaseUrl.get(`/getAllProducts?_t=${new Date().getTime()}`);
        } catch (error) {
            throw new Error(`Something went wrong:${error}`);
        }
      },
      async deleteTheProduct(token: string, id: string) {
        try {
          if (!token) {
            throw new Error("Authorization token is required or not found.");
          }
          if (!id) {
            throw new Error("Product ID is required to delete the product.");
          }
      
          const response = await BaseUrl.delete(`/deleteProduct/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.status !== 204) {
            throw new Error(`Failed to delete product. Server responded with status: ${response.status}`);
          }
      
          return "Product successfully deleted."; 
        } catch (error: unknown) {
          handleError(error)
        }
      },
      updateData(token: string, id: string, updatedData: any) {
        try {
          if (!token) {
            throw new Error("Authorization token is required.");
          }
          if (!id) {
            throw new Error("Product ID is required.");
          }
          if (!updatedData || Object.keys(updatedData).length === 0) {
            throw new Error("Updated data is required.");
          }
      
          return BaseUrl.put(`/updateProduct/${id}`, updatedData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error: unknown) {
          handleError(error)
        }
      },
      getProductsWithSpecificType(type:string){
        try {
          if(!type){
              throw new Error("can't find type of product");
          }
          return BaseUrl.get(`/productType/${type}`)
        } catch (error) {

          handleError(error)
        }
      },
      getProductById(id:string){
        try {
          if(!id){
            throw new Error("Product ID is required")
          }
  
          return BaseUrl.get(`/product/${id}`)
        } catch (error) {
            handleError(error)
        }
      },

     async createProductDetailsController(token:string,productDetails:ProductDetailsType){

        try {
          if (!token) {
            throw new Error("Authorization token is required.")
          }
          const { 
            productId,
             description,
             images,
             reviews,
             specifications,
             subjectSizes,
             subjectColors,
             stock,
             relatedProducts, 
            videoReview, 
            availableForPreorder }:ProductDetailsType = productDetails

          // const filteredProductDetails = {
          //   productId,
          //   description,
          //   images,
          //   reviews,
          //   specifications,
          //   subjectSizes,
          //   subjectColors,
          //   stock,
          //   relatedProducts, 
          //  videoReview, 
          //  availableForPreorder 
          // }
          const response = await BaseUrl.post(`/createProductDetails/${productId}`, productDetails,{            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        if (response.status !== 200) {
            throw new Error("Something went wrong");
        }
          return  response.data
        } catch (error) {
          handleError(error)
        }
      },
      async SearchProduct(searchQuery: string,page:number) {
        try {
          if (!searchQuery) {
            throw new Error("Search query is required.");
          }
          
          const response = await BaseUrl.get(`/searchAnything?searchQuery=${encodeURIComponent(searchQuery)}&page=${encodeURIComponent(page)}`);
      
          if (response.status !== 200) {
            throw new Error("Something went wrong with Search Product");
          }
          return response.data;
        } catch (error) {
          handleError(error);
        }
      },
      async SearchResaultFilter(params: {
        searchQuery: string;
        sort?: string;
        priceFrom?: number;
        priceTo?: number;
        type?: string;
        sex?: string;
        discount?: boolean;
        rating?: number;
      }) {
        try {
          const queryString = new URLSearchParams();
      
          if (params.searchQuery) queryString.append("searchQuery", params.searchQuery);
          if (params.sort) queryString.append("sort", params.sort);
          if (params.priceFrom !== undefined) queryString.append("priceFrom", params.priceFrom.toString());
          if (params.priceTo !== undefined) queryString.append("priceTo", params.priceTo.toString());
          if (params.type) queryString.append("type", params.type);
          if (params.sex) queryString.append("sex", params.sex);
          if (params.discount !== undefined) queryString.append("discount", String(params.discount));
          if (params.rating !== undefined) queryString.append("rating", params.rating.toString());
      
          const response = await BaseUrl.get(`/searchResaultFilter?${queryString.toString()}`);
      
          if (response.status !== 200) {
            throw new Error("Something went wrong with Search Product");
          }
      
          return response.data;
        } catch (error) {
          handleError(error);
        }
      }
      
};  
