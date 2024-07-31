import getCookie from '@/lib/functions/getCookie';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'to-do' | 'in-progress' | 'under-review' | 'finished';
  priority?: 'urgent' | 'medium' | 'low';
  deadline?: Date;
}
interface User {
  _id: string;
  username: string;
  email:string;
  password:string
}
interface TaskState {
  tasks: Task[];
  user:User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [{_id:'no',title:'fetching',status:'to-do'}], //dummy for skeleton
  user:null,
  status: 'idle',
  error: null,
};


export const fetchData = createAsyncThunk('tasks/fetchData', async (userId: string) => {
  const token = getCookie('token')
  const res = await fetch('/api/task/get-tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.error || 'Failed to fetch tasks');
  }
});

const appSlice = createSlice({
  name: 'app-data',
  initialState,
  reducers: {
    updateTaskStatus: (
      state,
      action: PayloadAction<Task[]>
    ) => {
     state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },  
    setUser:(state,action)=>{
      state.user =action.payload
    },
    clearUser: (state) => {
      state.user = null;
      state.tasks= []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload.tasks;
        state.user = action.payload.user
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error =  'Failed to fetch tasks';
      });
  },
});

export const { addTask, updateTaskStatus,setUser,clearUser } = appSlice.actions;
export default appSlice.reducer;
