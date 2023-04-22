import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../lib/mongodb";


export default withApiAuthRequired( async function handler(req, res) {
  const {user} = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db("jmint");
  const userProfile = await db.collection("users").findOne({
    auth0Id: user.sub
  });

  if(!userProfile?.availableTokens) {
    res.status(403);
    return;
  }

  const config = new Configuration ({
    apiKey: process.env.OPENAI_API_KEY
  });
  
    const openai = new OpenAIApi(config);

    const {topic, keywords} = req.body;

    if(!topic || !keywords){
      res.status(422);
      return;
    }

    if(topic.length > 300 || !keywords.length > 80){
      res.status(422);
      return;
    }

    /*const topic = "les 10 meilleurs conseils pour les propriètaires de chien";
    const keywords = "première aquisition, alimentation, santé";*/

    /*const response = await openai.createCompletion({
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 3000,
      prompt: `Genere un post de blog long et détaillé seo frendly à propos de ${topic}, et qui utilise les expressions suivantes sépararées par une virgule : ${keywords}.
      Le contenu de la reponse doit etre formaté en html seo frendly.
      La reponse doit inclure egalemnt un titre html et des meta descriptions
      Le format de retour doit etre json stringified comme suit :
      {
        "postContent": post content here
        "title": tilte here
        "metaDescription": meta description here
      }`,
    }); */

    const postContentResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [{
        role: "system",
        content: "tu es un generateur d'article de blog"
      }, {
        role: "user",
        content: `Genere un post de blog long et détaillé seo frendly à propos de ${topic}, et qui utilise les expressions suivantes sépararées par une virgule : ${keywords}.
        Le contenu de la reponse doit etre formaté en html seo frendly.
        Seulement avec les balises html suivantes : p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i`
      }],
    });

    const postContent = postContentResponse.data.choices[0].message?.content || "";

    const titleResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [{
        role: "system",
        content: "tu es un generateur d'article de blog"
      }, {
        role: "user",
        content: `Genere un post de blog long et détaillé seo frendly à propos de ${topic}, et qui utilise les expressions suivantes sépararées par une virgule : ${keywords}.
        Le contenu de la reponse doit etre formaté en html seo frendly.
        Seulement avec les balises html suivantes : p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i`
      }, {
        role: "assistant",
        content: postContent      
      }, {
        role: "user",
        content:   "Genere le texte du titre pour l'article ci-dessus"
      }],
    });

    const metaDescriptionResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [{
        role: "system",
        content: "tu es un generateur d'article de blog"
      }, {
        role: "user",
        content: `Genere un post de blog long et détaillé seo frendly à propos de ${topic}, et qui utilise les expressions suivantes sépararées par une virgule : ${keywords}.
        Le contenu de la reponse doit etre formaté en html seo frendly.
        Seulement avec les balises html suivantes : p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i`
      }, {
        role: "assistant",
        content: postContent      
      }, {
        role: "user",
        content:   "Genere les meta descrptions seo-frendly pour l'article ci-dessus"
      }],
    });

    const title = titleResponse.data.choices[0].message?.content || "";
    const metaDescription = metaDescriptionResponse.data.choices[0].message?.content || "";

    console.log('Contenu: ', postContent);
    console.log('Titre: ', title);
    console.log('Meta descrition: ', metaDescription);

    await db.collection("users").updateOne({
      auth0Id: user.sub
    }, {
      $inc: {
        availableTokens: -1
      }
    });

    const post = await db.collection("mints").insertOne({
      postContent : postContent,
      title: title,
      metaDescription: metaDescription,
      topic,
      keywords,
      userId: userProfile._id,
      created: new Date(),
    });

    res.status(200).json({ 
      postId: post.insertedId,
     });
    });
  