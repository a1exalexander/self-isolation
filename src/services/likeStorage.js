export const likeStorage = {
  saveLike(id) {
    const likes = this.getLikes();
    if (!id || likes.some(like => String(like) === String(id))) return
    this.setLikes([...likes, id])
  },
  saveDislike(id) {
    const dislikes = this.getDislikes();
    if (!id || dislikes.some(dislike => String(dislike) === String(id))) return
    this.setDislikes([...dislikes, id])
  },
  getLikes() {
    return JSON.parse(localStorage.getItem('likes') || '[]');
  },
  getDislikes() {
    return JSON.parse(localStorage.getItem('dislikes') || '[]');
  },
  setLikes(likes) {
    localStorage.setItem('likes', JSON.stringify(likes));
  },
  setDislikes(dislikes) {
    localStorage.setItem('dislikes', JSON.stringify(dislikes));
  },
  hasLike(id) {
    return this.getLikes().some(like => String(like) === String(id))
  },
  hasDislike(id) {
    return this.getDislikes().some(dislike => String(dislike) === String(id))
  }
}

export default likeStorage;
