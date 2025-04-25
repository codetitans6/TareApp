import moongose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: join(__dirname, '../../.env') });

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("MONGO_URI no está definida en el archivo .env");
    }
    try {
        await moongose.connect(uri, {
            dbName: 'tareapp'
        })
        console.log('Conectado a MongoDB en localhost')
    } catch (error) {
        console.error(error)
        process.exit(1);
    }

}

export default connectDB