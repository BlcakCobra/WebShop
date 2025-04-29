export type ProductDetailsType = {
    productId: string; 
    description: string;
    images: string[];
    reviews?: {
        user: string;
        rating: number;
        comment?: string;
    }[];
    specifications?: Record<string, string | number>;
    subjectSizes: ("S" | "M" | "L" | "XL" | "XXL")[];
    subjectColors: string[];
    stock: number;
    relatedProducts?: string[];
    videoReview?: string;
    availableForPreorder?: boolean;
};
