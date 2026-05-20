import { fetchNews } from "../services/rssService.js";

export const getNews = async(req,res)=>{
    try{
        const news = await fetchNews();
        res.json({
            sucess: true,
            total: news.length,
            data : news
        });
    }catch(error){
         res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}