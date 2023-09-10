// import { dirname } from "path"
// import { fileURLToPath } from "url";
// export const __dirname = dirname(fileURLToPath(import.meta.url));


// console.log(__dirname);



import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;