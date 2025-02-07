const initialState = {
  userId: null,
  isAuthenticated: false,
  nickname: null,
  profileImage: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userId: action.payload.userId,
        nickname: action.payload.nickname,
        profileImage: action.payload.profileImage,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

// 액션 크리에이터 정의
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export default userReducer;