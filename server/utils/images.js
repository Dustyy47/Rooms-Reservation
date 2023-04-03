import path from "path";
import { __dirname } from "../start.js";

export async function saveImage(image, title) {
  const imageName = title + "--" + image.name;
  const types = ["jpg", "jpeg", "png"];
  if (types.indexOf(imageName.split(".").pop()) === -1) {
    return { status: false };
  }
  await image.mv(path.resolve(__dirname, "images", "rooms", imageName));
  return { status: true, name: imageName };
}
