import React, { Component } from 'react'
import axios from 'axios'

import Post from '../../components/Post/Post'
import FullPost from '../../components/FullPost/FullPost'
import NewPost from '../../components/NewPost/NewPost'
import './Blog.css'

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount () {
    const random = (Math.random()).toFixed(1)
    const url = random >= 0.3 ? 'https://jsonplaceholder.typicode.com/posts' : 'WrongUrl'
    console.log(`if random < 0.3, get wrong url, random: ${random}, url: ${url}`)
    axios.get(url)
      .then(res => {
        const posts = res.data.slice(0, 4)
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        })
        this.setState({ posts: updatedPosts })
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: true })
      })
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id })
  }

  render () {
    let posts = <p style={{ textAlign: 'center' }}>Something want wrong !</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
            key={post.id} />
        )
      })
    }

    return (
      <div>
        <section className='Posts'>
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    )
  }
}

export default Blog
