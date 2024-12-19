import Canva from "./components/Canva";
import Menu from "./components/Menu";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
    return (
        <SidebarProvider>
            <Menu />
            <Canva />
        </SidebarProvider>
    );
}

export default App;
