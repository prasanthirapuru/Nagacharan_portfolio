import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) {
  const { path: pathParts } = await props.params;
  const relativePath = pathParts.join("/");
  const filePath = path.join(process.cwd(), "src/assets/works", relativePath);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = request.headers.get("range");

  // Cache settings
  const cacheControl = "public, max-age=31536000, immutable";

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      return new NextResponse("Requested range not satisfiable", {
        status: 416,
        headers: { "Content-Range": `bytes */${fileSize}` },
      });
    }

    const chunksize = (end - start) + 1;
    const fileStream = fs.createReadStream(filePath, { start, end });
    const webStream = Readable.toWeb(fileStream);

    return new NextResponse(webStream as any, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize.toString(),
        "Content-Type": "video/mp4",
        "Connection": "close",
        "Cache-Control": cacheControl,
      },
    });
  } else {
    const fileStream = fs.createReadStream(filePath);
    const webStream = Readable.toWeb(fileStream);

    return new NextResponse(webStream as any, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": "video/mp4",
        "Connection": "close",
        "Cache-Control": cacheControl,
      },
    });
  }
}
