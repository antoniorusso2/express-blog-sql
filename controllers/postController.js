function validate(req) {
  const { title, slug, content, image, tags } = req.body;
  const errors = [];

  if (!title) errors.push('Title is required');

  if (!slug) errors.push('Slug is required');

  if (!content) errors.push('Content is required');

  if (!image) errors.push('Image is required');

  if (!tags) errors.push('Tags is required');

  return errors;
}

function queryFormat(query) {
  const formattedArr = []; //array con elementi da formattare e non per eliminare '-' e sostituirlo con uno spazio vuoto
  query.forEach((tag) => {
    tag = tag.replace(tag[0], tag[0].toUpperCase());
    tag = tag.replaceAll('-', ' ');
    formattedArr.push(tag);
  });

  return formattedArr;

  //TODO: cambiare anche il resto della stringa in caratteri minuscoli
}

/**
 *
 * @param {Response} res response per impostare anche il codice di errore nell'head della richiesta
 * @param {number} errorCode codice errore
 * @param {string} message messaggio da inviare a chi invia la richiesta
 * @returns Object
 */
function sendError(res, errorCode, message) {
  res.status(errorCode);
  return res.json({
    error: `${errorCode}`,
    message: message,
  });
}

//database connection
const connection = require('../data/db.js');

// const notFound = require('../middlewares/notFound.js');

// const posts = require('../posts.js');

//index func
function index(req, res) {
  if (req.query.tags) {
    const sql = `SELECT * 
                FROM posts
                JOIN post_tag AS p_t
                ON p_t.post_id = posts.id
                JOIN tags
                ON p_t.tag_id = tags.id
                WHERE tags.label = ?`;

    console.log(sql);

    connection.query(sql, [req.query.tags], (err, results) => {
      if (err) return res.status(500).json({ error: 'query fail' });
      res.json(results);
    });
  } else {
    connection.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: 'query fail' });
      // console.log(results);
      res.json(results);
    });
  }
}

//show func
function show(req, res) {
  const id = req.params.id; //parametro dinamico
  // console.log(id);

  // console.log(id);

  let filteredPost;

  if (typeof id === 'string') {
    filteredPost = posts.find((post) => post.slug === id);
  } else if (typeof id === 'number') {
    filteredPost = posts.find((post) => {
      return post.id === id;
    });
  } else {
    return notFound(req, res);
  }

  // console.log(filteredPost);

  // se il post non è presente return 404
  // cambio status da 200 a 404
  if (!filteredPost) {
    return notFound(req, res);
  }

  res.json(filteredPost); //output
}

//store func
function store(req, res) {
  const newId = posts.length + 1;

  const bodyData = req.body;

  const { title } = bodyData;

  //validazione parametri necessari 'title'
  if (!title || title.length < 1) {
    // res.status(400);
    // res.send({
    //   error: '400',
    //   message: "L'elemento creato necessita della proprieta 'title'"
    // });
    return sendError(res, 400, `L'elemento creato necessita della proprieta 'title'`);
  }

  const newElement = {
    id: newId,
    ...req.body,
  };

  console.log(newElement);

  posts.push(newElement);

  //log per verifica elemento creato e pushato
  // console.log(posts);

  res.status(201).send('elemento creato con successo');
}

//update func - put method
function update(req, res) {
  const id = req.params.id; //parametro dinamico
  console.log(id);

  const post = posts.find((post) => {
    return post.id === id;
  });

  const errors = validate(req);
  console.log(errors);

  if (errors.length > 0) {
    // res.status(400);

    // return res.send({
    //   error: '400',
    //   message: errors
    // });

    return sendError(res, 400, errors);
  }

  const bodyData = req.body;
  const { title, slug, content, image, tags } = bodyData;

  // post.title = title;
  // post.slug = slug;
  // post.content = content;
  // post.image = image;
  // post.tags = tags;

  for (let key in bodyData) {
    if (key !== undefined) {
      post[`${key}`] = key;
    }
  }

  res.json(post);
}

//patch func
function modify(req, res) {
  const id = req.params.id;

  const post = posts.find((post) => {
    return post.id === id;
  });

  const { title, slug, content, image, tags } = req.body;

  //controlla i campi e se sono presenti nella body request(quindi se sono campi da modificare) allora li sovrascrive con quelli presenti nella request
  if (title) post.title = title;
  if (slug) post.slug = slug;
  if (content) post.content = content;
  if (image) post.image = image;
  if (tags) post.tags = tags;

  res.send(post);
}

//destroy func
function destroy(req, res) {
  const id = req.params.id;

  //trovo direttamente l'index del post da eliminare da passare poi come parametro al metodo splice invocato sull'array di post
  const postIndex = posts.findIndex((post) => post.id === id); //return index del post gia' in formato numerico, se trovato || -1 se non trovato

  if (postIndex === -1) {
    // res.status(404);
    // return res.json({
    //   error: '404',
    //   message: 'Post not found'
    // });
    // return sendError(res, 404, 'Post inesistente');
    notFound(req, res);
    return;
  }

  posts.splice(postIndex, 1);

  //invio status code 204 per notificare che l'operazione è andata a buon fine
  res.sendStatus(204);

  console.log(posts);
}

module.exports = { index, show, store, update, modify, destroy };
