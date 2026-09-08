import redis from "../../shared/redis/redis.js";


export const protect =async (req,res,next) => {

    try {

        const sessionId = req.cookies?.sessionId;

        if (!sessionId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const result = await redis.get(`session:${sessionId}`);
        if (!result) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const data = JSON.parse(result);

        req.user = data;

        next();
            
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'protect middleware error' });
    }
    
}