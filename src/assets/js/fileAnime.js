import fs from 'fs';

export default (() => {
    const file = () => new URL('./../json/anime.json', import.meta.url).pathname;
    return {
        read: () => JSON.parse(fs.readFileSync(file(), 'utf8')),
        write: (data) => fs.writeFileSync(file(), JSON.stringify(data), 'utf8')
    };
})();