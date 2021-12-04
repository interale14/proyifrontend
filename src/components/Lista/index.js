import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Page from '../Page';
import { List, ListItem } from '../UI/List';
import { fetchMessageData } from '../../store/reducers/swot/actions';

const Loader = ()=>{
  return (<div className="page-center">Cargando...</div>);
}

const Lista = () => {
    const message = useSelector(({message})=>message);
    const dispatch = useDispatch();
    const {hasMore, items, currentPage, pageSize} = message;

    const fetchMore = () => {
        console.log("Loading More");
        fetchMessageData(dispatch, currentPage + 1, pageSize)
    }

    useEffect(()=>{
        fetchMore();
    }, []);

    const itemsUI = items.map((o,i)=>{
        return (<ListItem key={i}>{o.title} {o.message}</ListItem>);
    });

    return(
        <Page showHeader title="Mensajes" showNavBar>
            <List
                id="messageList"
                hasMore={hasMore}
                fetchMore={fetchMore}
                loader={(<Loader />)}
                dataLength={items.length}
            >
                {itemsUI}
            </List>
        </Page>
    );
}

export default Lista;