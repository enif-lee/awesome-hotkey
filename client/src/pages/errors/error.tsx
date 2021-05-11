import {FC} from "react";
import {Button} from "rsuite";
import {useHistory} from "react-router-dom";


const ErrorPage: FC<{ code: number }> = props => {
    const history = useHistory();

    return <>
        <div> {props.code} 에러페이지</div>
        <div><Button onClick={() => history.push("/")}>홈으로 돌아가기</Button></div>
    </>
}

export default ErrorPage
