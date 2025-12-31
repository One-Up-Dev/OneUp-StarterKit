import { NextResponse } from "next/server";
import { polarClient } from "@/lib/auth";

interface ProductStatus {
  id: string;
  name: string;
  slug: string;
  configured: boolean;
  verified: boolean;
  price?: string;
  error?: string;
}

interface PolarProductsStatus {
  polarConnected: boolean;
  products: ProductStatus[];
}

async function verifyProduct(
  productId: string,
  slug: string,
  name: string,
): Promise<ProductStatus> {
  if (
    !productId ||
    productId === `your-${slug}-product-id` ||
    productId === ""
  ) {
    return {
      id: productId || "",
      name,
      slug,
      configured: false,
      verified: false,
      error: "Product ID not configured",
    };
  }

  try {
    const product = await polarClient.products.get({ id: productId });

    return {
      id: productId,
      name: product.name || name,
      slug,
      configured: true,
      verified: true,
      price:
        product.prices?.[0]?.amountType === "fixed"
          ? `${(product.prices[0].priceAmount / 100).toFixed(2)} ${product.prices[0].priceCurrency?.toUpperCase() || "USD"}`
          : undefined,
    };
  } catch (error) {
    return {
      id: productId,
      name,
      slug,
      configured: true,
      verified: false,
      error:
        error instanceof Error ? error.message : "Failed to verify product",
    };
  }
}

export async function GET() {
  const polarToken = process.env.POLAR_ACCESS_TOKEN;
  const polarConnected =
    !!polarToken && polarToken !== "your-polar-access-token";

  if (!polarConnected) {
    return NextResponse.json({
      polarConnected: false,
      products: [
        {
          id: "",
          name: "Basic",
          slug: "basic",
          configured: false,
          verified: false,
          error: "Polar access token not configured",
        },
        {
          id: "",
          name: "Pro",
          slug: "pro",
          configured: false,
          verified: false,
          error: "Polar access token not configured",
        },
        {
          id: "",
          name: "Elite",
          slug: "elite",
          configured: false,
          verified: false,
          error: "Polar access token not configured",
        },
      ],
    } as PolarProductsStatus);
  }

  const [basic, pro, elite] = await Promise.all([
    verifyProduct(process.env.POLAR_PRODUCT_BASIC || "", "basic", "Basic"),
    verifyProduct(process.env.POLAR_PRODUCT_PRO || "", "pro", "Pro"),
    verifyProduct(process.env.POLAR_PRODUCT_ELITE || "", "elite", "Elite"),
  ]);

  return NextResponse.json({
    polarConnected: true,
    products: [basic, pro, elite],
  } as PolarProductsStatus);
}
