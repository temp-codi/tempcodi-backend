export const pollutionCalc = (pollution: number) => {
    switch (pollution) {
        case 1:
            return { en: 'Good', kr: '좋음' };
        case 2:
            return { en: 'Fair', kr: '좋음' };
        case 3:
            return { en: 'Moderate', kr: '중간' };
        case 4:
            return { en: 'Poor', kr: '나쁨' };
        case 5:
            return { en: 'Very Poor', kr: '매우 나쁨' };
        default:
            return { en: 'InValid', kr: '데이터 문제있음' };
    }
};
