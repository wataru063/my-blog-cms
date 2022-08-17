import React, { useEffect, useState } from 'react'
import { Octokit } from 'octokit'
import { Buffer } from 'buffer';

interface OctokitRes {
  path: string
}

const Home = () => {
  const [contents, setContents] = useState(['']);
  useEffect(() => {
    const fetchContents = async () => {
      const octokit = new Octokit({auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN})
      const list: Array<string> = await octokit.request('GET /repos/wataru063/my-blog-contents/contents/', {
        owner: process.env.REACT_APP_CONTENTS_OWNER_NAME,
        repo: process.env.REACT_APP_CONTENTS_REPO_NAME,
      })
      .then(res => (res.data as Array<OctokitRes>).map(el => el.path))
      if(list && list.length > 0) {
        await Promise.all(list.map(async (path)=> {
          return await octokit.request('GET /repos/wataru063/my-blog-contents/contents/' + path, {
            owner: process.env.REACT_APP_CONTENTS_OWNER_NAME,
            repo: process.env.REACT_APP_CONTENTS_REPO_NAME,
          })
          .then(res => {
            console.log('res: ', res.data.content);
            return Buffer.from(res.data.content, 'base64').toString("utf-8");
          })
        }))
        .then(res => console.log(res))
      }
    }
    fetchContents()
  }, []);
  return (
    <div>Home</div>
  )
}

export default Home