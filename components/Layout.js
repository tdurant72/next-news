import Toolbar from './toolbar'
function Layout({ children }) {
    return (
        <>
            <Toolbar />
            {children}

        </>
    );
}

export default Layout;