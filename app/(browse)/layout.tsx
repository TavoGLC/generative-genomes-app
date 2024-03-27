import { Sidebar } from "../_components/sidebar/sidebar"

const BrowseLayout = ({
    children,
}:{
    children:React.ReactNode
}) => {
    return(
        <div>
            <Sidebar/>
                {children}
        </div>
    ) 
}

export default BrowseLayout 