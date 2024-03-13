import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './component/navbar.tsx';
import Articlelist from './component/articlelist';
import Footer from './component/footer.tsx'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Update from './component/update.jsx'

/* xmodmap -e "keycode 87 = less" && xmodmap -e "keycode 88 = greater"
*/

const defaultTheme = createTheme();

export default function Album() {
  return (
      <Router>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
            <Navbar/>
            <Routes>
                <Route path='/' element={<Articlelist/>}></Route>
                <Route path='/update' element={<Update/>}></Route>
            </Routes>
            <Footer/>
        </ThemeProvider>
      </Router>
  );
}