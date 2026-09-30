import { Jimp } from 'jimp';

async function cropIcon() {
    try {
        const image = await Jimp.read('C:\\Users\\moksh\\.gemini\\antigravity-ide\\brain\\9ec54b17-adae-4889-974e-90cd962ae857\\.user_uploaded\\media_1790749642839.jpg');
        
        // The image is 1024x1024. Watermark is at bottom right.
        // Let's crop it to 900x900 from the top-left to cut off the bottom and right edges.
        image.crop({ x: 0, y: 0, w: 900, h: 900 });
        
        // Resize back to 1024x1024 for standard capacitor icon size.
        image.resize({ w: 1024, h: 1024 });
        
        await image.write('./assets/icon.png');
        console.log('Icon created successfully without watermark.');
    } catch (err) {
        console.error(err);
    }
}

cropIcon();
