import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import PostDetail from '../pages/PostDetail'
import NewPost from '../pages/NewPost'

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='/posts/:postId' element={< PostDetail />} />
            <Route path='/posts/new' element={<NewPost />} />
        </Routes>
    )
}

export default Router
