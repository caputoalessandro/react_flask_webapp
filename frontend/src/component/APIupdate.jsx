export default class APIupdate {
   static UpdateArticle(id,body) {
       return fetch('http://127.0.0.1:5000/get/${id}', {
           body: JSON.stringify(body)
       }).then(resp => resp.json())
   }
}


