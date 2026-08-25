const ImageKit = require("imagekit");

// Initialize lazily so a missing ImageKit config only affects the upload
// endpoint instead of crashing the whole API at startup.
let imagekit;

function getImageKit() {
    if (!imagekit) {
        const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;
        if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
            throw new Error('ImageKit is not configured. Set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT to enable uploads.');
        }
        imagekit = new ImageKit({
            publicKey: IMAGEKIT_PUBLIC_KEY,
            privateKey: IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: IMAGEKIT_URL_ENDPOINT
        });
    }
    return imagekit;
}

async function uploadFile(file, fileName) {
    const result = await getImageKit().upload({
        file: file, // required
        fileName: fileName, // required
    })

    return result; // Return the URL of the uploaded file
}

module.exports = {
    uploadFile
}