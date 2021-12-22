/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const axios = require("axios") // got doesn't work

const owner = process.env.GITHUB_OWNER
const repo = process.env.GITHUB_REPO
const token = process.env.GITHUB_ACCESS_TOKEN;
const workflow_id = process.env.GITHUB_WORKFLOW_ID;
const ref = process.env.GITHUB_BRANCH;

const github_actions_hook = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;
 
exports.receive_message = function(req, res) {
   
  res.set('Access-Control-Allow-Origin', `*`)
  res.set('Access-Control-Allow-Methods', 'POST')
    
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '3600')
    return res.status(204).send('')
  }
   
   if (req.method === 'POST') {
    const { name, body } = req.body

    if(!name) {
      return res.status(422).send({
        message: "missing name field"
      })
    }

    if(!body) {
      return res.status(422).send({
        message: "missing body field"
      })
    }

    return axios.post(github_actions_hook,
      {
        ref,
        inputs : {
          body,
          name
        }
      }, {
        headers: {
          "Authorization": `token ${ token }`
        }
      }
    ).then(() => {
      console.log('action success');
      return res.status(200).send({body: "sent"});
    }).catch(error => {
      console.log(error.response)
      return res.status(error.response.status).send({
        ...error.response.data
      })
    })
  }
}
