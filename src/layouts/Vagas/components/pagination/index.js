import MDPagination from "components/MDPagination";

// @mui material components
import Icon from "@mui/material/Icon";
import { useSelector, useDispatch } from 'react-redux';
import MDBox from "components/MDBox";
import { loadVagas, searchVagas } from "slices/vagaSlice";

function PaginationComponent({ search }) {
    const dispatch = useDispatch();
    const vagasRedux = useSelector(state => state.vagas);





    if (vagasRedux.status === 'sucess' && vagasRedux.vagas.status === 200) {
        console.log(vagasRedux.vagas.data)
        let countPages = [];
        for (let index = 1; index <= vagasRedux.vagas.data.meta.last_page; index++) {
            countPages.push(`/?page=${index}`);
        }

        return (
            <MDPagination size="small">
                <MDPagination item onClick={() => { !search ? dispatch(loadVagas(vagasRedux.vagas.data.meta.previous_page_url)) : dispatch(searchVagas({ pagination: vagasRedux.vagas.data.meta.previous_page_url, query: search })) }}>
                    <Icon>keyboard_arrow_left</Icon>
                </MDPagination>
                {countPages.map((item, i) => {
                    const index = (i + 1);
                    if (index === vagasRedux.vagas.data.meta.current_page) {
                        return (<MDPagination key={i} item active onClick={() => { !search ? dispatch(loadVagas(item)) : dispatch(searchVagas({ pagination: item, query: search })) }}>{index}</MDPagination>)
                    }
                    return (<MDPagination key={i} item onClick={() => { !search ? dispatch(loadVagas(item)) : dispatch(searchVagas({ pagination: item, query: search })) }}>{index}</MDPagination>)

                })}
                <MDPagination item onClick={() => {
                    !search ? dispatch(loadVagas(vagasRedux.vagas.data.meta.next_page_url)) : dispatch(searchVagas({ pagination: vagasRedux.vagas.data.meta.next_page_url, query: search }))
                }}>
                    <Icon>keyboard_arrow_right</Icon>
                </MDPagination>

            </MDPagination>

        );
    }


    return (<MDBox> <MDPagination size="small">
        <MDPagination item >
            <Icon>keyboard_arrow_left</Icon>
        </MDPagination>

        <MDPagination item >
            <Icon>keyboard_arrow_right</Icon>
        </MDPagination>

    </MDPagination>
    </MDBox>)


}

export default PaginationComponent;