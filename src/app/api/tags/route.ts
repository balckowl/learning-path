import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/client";

export const GET = async () => {
  const tags = await prisma.tag.findMany();
  return NextResponse.json(tags);
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
