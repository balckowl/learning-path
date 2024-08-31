import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/client";

export const GET = async () => {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
  /** schema:
   * [
   *  {
   *    "id": number,
   *    "name": string,
   *    "createdAt": Date,
   *    "updatedAt": Date,
   *    "image": string,
   *  },
   * ]
   */
};
