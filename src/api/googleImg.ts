import axios from 'axios';

interface IGoogleParam {
    keyword: string;
    pageNo: number;
    gender: 'male' | 'female';
}

/** 구글 이미지 검색 api */
const getGoogleSearchImgs = async ({
    keyword,
    pageNo,
    gender,
}: IGoogleParam) => {
    const response = await axios.get(`
 https://www.googleapis.com/customsearch/v1?key=${
     process.env.GOOGLE_API_KEY
 }&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${
        keyword + 'for' + gender
    }&searchType=image&num=10&start=${pageNo}
 `);
    const arr = response.data.items.map((item: any) => {
        const {
            link,
            image: { contextLink },
        } = item;
        return { img: link, siteLink: contextLink };
    });
    return arr;
};

export default getGoogleSearchImgs;
