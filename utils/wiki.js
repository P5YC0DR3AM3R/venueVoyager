const wiki = require('wikipedia');

const getStadiumImages = async (stadiumName) => {
    try {
        const page = await wiki.page(stadiumName);
        const images = await page.images();
        return images;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    getStadiumImages,
};