import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import invariant from 'tiny-invariant';
import { marked } from 'marked';
import { json } from 'remix';

export type Post = {
  slug: string;
  title: string;
};

export type NewPost = {
  title: string;
  slug: string;
  markdown: string;
};

export type PostMarkdownAttributes = {
  title: string
}

const postsPath = path.join(__dirname, '..', 'posts')

function isValidPostAttributes(attributes: any): attributes is PostMarkdownAttributes {
  return attributes?.title
}

export async function getPosts() {
  const dir = await fs.readdir(postsPath)

  const handleReadFile = async (filename: string) => {
    const file = await fs.readFile(
      path.join(postsPath, filename)
    )

    const fileContent = parseFrontMatter(
      file.toString()
    )

    invariant(
      isValidPostAttributes(fileContent.attributes),
      `${filename} has bad meta data!`
    )

    return {
      slug: filename.replace(/\.md$/, ''),
      title: fileContent.attributes.title
    }
  }
  
  const rawPosts = dir.map(handleReadFile)
  
  return Promise.all(rawPosts)
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const fileContent = parseFrontMatter(
    file.toString()
  )

  invariant(
    isValidPostAttributes(fileContent.attributes),
    `Post ${filepath} is missing attributes`
  );

  const html = marked(fileContent.body)

  return {
    slug,
    html,
    title: fileContent.attributes.title
  };
}

export async function createPost(post: NewPost) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;

  await fs.writeFile(
    path.join(postsPath, post.slug + ".md"),
    md
  );
  
  return json(await getPost(post.slug));
}