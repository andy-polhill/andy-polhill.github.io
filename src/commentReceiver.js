/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 const domain = 'localhost:8001';
 const github_actions_hook = '';

 exports.receive_message = async (req, res) => {
 
   const host = req.get('host');
   console.info(`method: ${req.method}`);
   console.info(`host: ${host}`)
   
   if(host !== domain) {
    //  return res.status(401).send('');    
   }
 
  //  res.set('Access-Control-Allow-Origin', `https://${domain}`);
    res.set('Access-Control-Allow-Origin', `*`);
 
   if (req.method === 'OPTIONS') {
     res.set('Access-Control-Allow-Methods', 'GET');
     res.set('Access-Control-Allow-Headers', 'Content-Type');
     res.set('Access-Control-Max-Age', '3600');
     return res.status(204).send('');
   } 
   
   if (req.method === 'POST') {
    const { name, body } = req.body;

    const response = await fetch("github_actions_hook", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ body, name }) 
    });

    console.log(response)

    // get the workflow secret
    // now forward these to Github Action for processing.
    return res.status(200).send({body: "sent"});
   }
 
   return res.status(501).send('');
 };
 