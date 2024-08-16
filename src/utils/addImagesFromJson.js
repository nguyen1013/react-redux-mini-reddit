// This function is to extract images from the JSON data of a Reddit post
export default function addImagesFromJson(post) {
  const images = []

  if (post.url.includes("jpg") || post.url.includes("jpeg")) {
    images.push(post.url)
  } else if (post.media_metadata) {
    const metadataImages = post.media_metadata;
    if (metadataImages) {
      for (const i in metadataImages) {
        if (i.e === 'Image') {
          const imageUrl = metadataImages[i].p.find((image) => image.x === 640);
          if (imageUrl) {
            images.push(imageUrl.u);
          }
        }
      }
    }
  } else if (post.preview) {
    const previewImages = post.preview.images[1];
    if (previewImages) {
      for (const i in previewImages) {
        const imageUrl = previewImages[i].p.find((image) => image.x === 640);
        if (imageUrl) {
          images.push(imageUrl.u);
        }
      }
    }
  }

  return images;
}