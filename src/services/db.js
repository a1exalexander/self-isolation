import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { API_URL, firebaseConfig } from '../api';
import logger from './logger';

const serialize = snapshot => {
  return Object.defineProperty(snapshot.data(), 'id', { enumerable: true, value: snapshot.id });
};

Vue.use(firestorePlugin, { serialize });

const { Timestamp } = firebase.firestore;
export { Timestamp };

logger?.info(firebaseConfig);

const options = {
  PATCH: body => ({
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }),
  POST: body => ({
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
};

export const db = firebase.initializeApp({ projectId: firebaseConfig.projectId }).firestore();

export const dbLocal = {
  takePostsSnapshot(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
  },
  getPostsSnapshot() {
    return JSON.parse(localStorage.getItem('posts') || '[]');
  },
  async getPosts() {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      logger.debug(data);
      logger.info('Posts loaded');
      this.takePostsSnapshot([]);
      return data;
    } catch (err) {
      logger.error(err.response);
      return this.getPostsSnapshot();
    }
  },
  async like(id) {
    try {
      const post = await fetch(`${API_URL}/posts/${id}`);
      const { likes } = await post.json();
      const res = await fetch(
        `${API_URL}/posts/${id}`,
        options.PATCH({ likes: Number(likes) + 1 })
      );
      const data = await res.json();
      logger.debug(data);
      logger.info('Like posted');
      return 1;
    } catch (err) {
      logger.error(err.response);
      return 0;
    }
  },
  async dislike(id) {
    try {
      const post = await fetch(`${API_URL}/posts/${id}`);
      const { dislikes } = await post.json();
      const res = await fetch(
        `${API_URL}/posts/${id}`,
        options.PATCH({ dislikes: Number(dislikes) + 1 })
      );
      const data = await res.json();
      logger.debug(data);
      logger.info('Dislike posted');
      return 1;
    } catch (err) {
      logger.error(err.response);
      return 0;
    }
  }
};

export default db;
