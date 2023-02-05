import axios from 'axios';

interface IOpenGPT {
    weather: string;
}

const useOpenGPT = async ({ weather }: IOpenGPT) => {
    const response = await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/completions',
        headers: {
            Authorization: `Bearer ${process.env.OPEN_GPT_API_KEY}`,
            'Content-Type': 'application/json',
        },
        data: {
            model: 'text-davinci-003',
            prompt: `list 5 outfits to wear on a ${weather} day in numbers`,
            temperature: 1,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        },
    });
    return response;
};

export default useOpenGPT;
