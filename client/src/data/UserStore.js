import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';
// Acting as a call to the backend or some middleware.
import {
  getUser,
  getUserPosts,
  getPosts,
  getLists
} from './MockDataProvider';
import { Login } from 'login/login';

import { listReducer } from 'data/ListStore';
import { postReducer } from 'data/PostStore';

// No sure where this id will be coming from yet, but it's
// time to start passing in more realistic user data.
const authenticated = false;
const login = true;
const id = '5e971574a9cf0a2af1421606';

const lists = getLists();
const activeList = {};
// Used to add and remove content on-the-fly.
// TODO: Rework configured blocks and integrate this functionality.
const dynamicContent = [];
const user = getUser(id);

const initialState = {
  isFetchingPosts: false,
  login,
  authenticated,
  activeList,
  ...userConfig,
  user,
  lists,
  posts: [],
  dynamicContent
};

export function userReducer(state, action) {
  switch (action.store) {
    case 'ListStore':
      return listReducer(state, action);
    case 'PostStore':
      return postReducer(state, action);
  }
  switch (action.type) {
    case 'setPostData':
      // This would not be necessary if the properties of the backend
      // model were implemented based on the documentation.
      const posts = action.payload.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          interest: post.topic,
          arrayLike: post.arrayLike,
          likeCount: post.likeCount,
          isActive: post.isActive,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          author: post.author,
          comments: post.comments
        }
      });
      return {...state, posts: posts, isFetchingPosts: false};
    case 'isFetchingPosts':
      console.log('isFetchingPosts');
      return {...state, isFetchingPosts: true};
    case 'login':
      console.log('login');
      state.login = true;
      return {...state};
    case 'signIn':
      console.log('signIn');
      console.log(action.payload);
      // TODO: Check if sign-in was successful.
        state.authenticated = true;
      return {...state};
    case 'register':
      state.login = false;
      console.log(action.payload);
      // TODO: Check if registration was successful.
      return {...state};
    case 'changeTab':
      state.section[action.payload.section].interest = action.payload.interest;
      return {...state};
    // TODO: Refactor to not require activeList.  It's a work-around
    // to cause ListItems to re-render when items have been updated.
    case 'activeList':
      console.log(action.payload);
      return {...state, activeList: {...action.payload}};
    case 'logout':
      console.log('Logging out');
      return null;
    case 'newFriendRequest':
      console.log(`userId ${action.payload.userId} want to be friends with userId ${action.payload.friendId}`);
      return { ...state };
    case 'changeActiveHeaderTab':
      return { ...state, activeHeaderTab: action.payload };
    case 'popBlock':
      state.dynamicContent.shift();
      console.log(`popBlock (length): ${state.dynamicContent.length}`);
      return { ...state };
    case 'pushBlock':
      state.dynamicContent.unshift(action.payload);
      console.log(`pushBlock (length): ${state.dynamicContent.length}`);
      console.log(state.dynamicContent);
      return { ...state };
    default:
      return {...state};
  }

}

export const UserContext = createContext({});

export const UserStore = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return(
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}
