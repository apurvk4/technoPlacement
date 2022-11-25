import { useEffect } from "react"

const Dropdown = (props)=>{
    // const adminLinks = useRef(null);
    function hide(e){
            props.r.current.classList.remove('admin-link-active');
    }
    useEffect(()=>{
        document.addEventListener('click',hide);
        return ()=>{
            document.removeEventListener('click',hide);
        }
    })
    return (
        <ul className="dropdown-menu" ref={props.r}>
            {props.children}
      </ul>
    )
}

export default Dropdown;